import React, {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import parse from "html-react-parser";
import {CSSTransition, TransitionGroup} from "react-transition-group";

import ProgressCircleInfinity from "@/common/components/progressCircleInfinity/index";
import ScrollText from "@/common/components/scrollText/index";
import {MessageMarkdown} from "@/common/components/markdown/index";
import SettingDialog from "@/common/components/setting/index";
import SearchInput from "@/common/components/searchInput/index";

import IconWebsite from "@/common/assets/icon_website.svg";

import search from "@/api/search";

import './index.css';

const Search = () => {
    const nav = useNavigate();
    const [params] = useSearchParams();

    const query = params.get('q');

    const [aiReasoningContent, setAIReasoningContent] = useState("");
    const [aiContent, setAIContent] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const [step, setStep] = useState(1);
    const [showAIPanel, setShowAIPanel] = useState(false);
    const [thinkingFinished, setThinkingFinished] = useState(false);
    const [onlyAIMode, setOnlyAIMode] = useState(false);
    const [searchSuccess, setSearchSuccess] = useState(true);
    const [aiSuccess, setAiSuccess] = useState(true);

    const doSearch = () => {
        setShowAIPanel(false);
        setSearchResult(null);
        setStep(1);
        setAIReasoningContent('');
        setAIContent('');
        setThinkingFinished(false);
        setOnlyAIMode(false);
        setSearchSuccess(true);
        setAiSuccess(true);

        let thinkingFlag = false;

        search.search(query, {
            onOpen: () => {
            },
            onMessage: (data) => {
                if (data.code !== 0) {
                    console.error('search error:', data.code);
                    return;
                }

                if (data.data) {
                    switch (data.data.action) {
                        case 'search':
                            setStep(2);
                            break;
                        case 'ai':
                            setStep(3);
                            setShowAIPanel(true);
                            break;
                        case 'ai_result':
                            if (data.data.data.reasoning) {
                                setAIReasoningContent(old => old + data.data.data.reasoning);
                            } else {
                                if (!thinkingFlag) {
                                    thinkingFlag = true;
                                    setThinkingFinished(true);
                                }
                            }
                            setAIContent(old => old + (data.data.data.content || ''));
                            break;
                        case 'search_result':
                            setSearchResult(data.data.data);
                            break;
                        case 'intent_analysis_result':
                            setOnlyAIMode(data.data.data.type === 1);
                            break;
                        case 'search_error':
                            setSearchSuccess(false);
                            break;
                        case 'ai_error':
                            setAiSuccess(false);
                            break;
                    }
                }
            },
            onClose: () => {
                setStep(4);
            },
            onError: (e) => {
                console.error("search error:", e);
            }
        });
    }

    const submit = (value) => {
        nav({
            pathname: "/search",
            search: `?q=${encodeURIComponent(value)}`,
        });
    }

    const toHome = () => {
        nav({pathname: "/"});
    }

    useEffect(() => {
        if (!query || !query.trim()) {
            toHome();
            return;
        }

        doSearch();
    }, [query]);

    return (
        <div className="w-[calc(100vw-20px)] md:w-full mx-auto">
            <header
                className="w-[calc(100vw-20px)] md:w-full py-2 md:py-4 flex flex-col items-center md:grid md:grid-cols-4 sticky top-0 z-40 backdrop-blur-md backdrop-saturate-180 bg-base-100/50">
                <div className="md:flex flex-row justify-end items-center mt-2 mb-4 md:mt-0 md:mb-0">
                    <span className="font-lilitaone text-3xl md:mr-10 cursor-pointer"
                          onClick={() => toHome()}>Intsearch</span>
                </div>

                <SearchInput className="md:col-span-2 md:col-start-2" currentValue={query}
                             onSubmit={submit}/>

                <div className="hidden md:flex flex-row justify-start items-center ml-10">
                    <label className="toggle text-base-content">
                        <input type="checkbox" value="dim" className="theme-controller"/>

                        <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none"
                               stroke="currentColor">
                                <circle cx="12" cy="12" r="4"></circle>
                                <path d="M12 2v2"></path>
                                <path d="M12 20v2"></path>
                                <path d="m4.93 4.93 1.41 1.41"></path>
                                <path d="m17.66 17.66 1.41 1.41"></path>
                                <path d="M2 12h2"></path>
                                <path d="M20 12h2"></path>
                                <path d="m6.34 17.66-1.41 1.41"></path>
                                <path d="m19.07 4.93-1.41 1.41"></path>
                            </g>
                        </svg>

                        <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none"
                               stroke="currentColor">
                                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                            </g>
                        </svg>
                    </label>

                    <button className="btn btn-circle btn-outline btn-xs ml-4 text-base-content"
                            onClick={() => document.getElementById('model_setting').showModal()}>
                        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="256" height="256">
                            <path fill="currentColor"
                                  d="M880.037 461.451c-2.896-16.078-18.396-32.444-34.473-36.066l-12.021-2.751c-28.244-8.547-53.302-27.232-69.234-54.751-15.933-27.665-19.701-59.097-12.748-87.917l3.767-11.299c4.779-15.643-1.45-37.223-14.049-47.943 0 0-11.299-9.559-43.164-27.954-31.866-18.25-45.626-23.319-45.626-23.319-15.499-5.648-37.224-0.289-48.522 11.733l-8.403 8.98c-21.436 20.278-50.26 32.589-82.123 32.589s-60.976-12.454-82.415-32.878l-8.114-8.692c-11.153-12.021-33.022-17.378-48.522-11.732 0 0-13.904 5.069-45.77 23.318-31.866 18.54-43.018 28.099-43.018 28.099-12.6 10.574-18.829 32.010-14.049 47.798l3.479 11.442c6.807 28.822 3.185 60.11-12.748 87.772s-41.273 46.497-69.659 54.899l-11.587 2.606c-15.933 3.622-31.577 19.844-34.473 36.066 0 0-2.606 14.483-2.606 51.273s2.606 51.273 2.606 51.273c2.896 16.222 18.395 32.444 34.473 36.066l11.299 2.606c28.388 8.403 53.88 27.232 69.813 55.040 15.933 27.666 19.701 59.097 12.748 87.918l-3.33 11.153c-4.779 15.643 1.45 37.223 14.048 47.943 0 0 11.299 9.559 43.164 27.954s45.625 23.319 45.625 23.319c15.499 5.647 37.224 0.289 48.522-11.733l7.966-8.547c21.579-20.423 50.549-32.878 82.56-32.878s61.121 12.6 82.56 33.022l7.966 8.547c11.153 12.021 33.022 17.383 48.522 11.732 0 0 13.904-5.069 45.77-23.318 31.866-18.396 43.018-27.954 43.018-27.954 12.6-10.574 18.829-32.154 14.048-47.943l-3.479-11.588c-6.807-28.677-3.185-59.964 12.748-87.484 15.933-27.666 41.424-46.638 69.813-55.040l11.299-2.606c15.933-3.622 31.577-19.844 34.473-36.066 0 0 2.606-14.483 2.606-51.273-0.152-36.937-2.759-51.421-2.759-51.421zM513.45 660.027c-81.256 0-147.303-65.901-147.303-147.303 0-81.256 65.901-147.159 147.303-147.159 81.256 0 147.303 65.901 147.303 147.303-0.148 81.256-66.049 147.159-147.303 147.159z"></path>
                        </svg>
                    </button>
                </div>
            </header>

            <div className="w-full flex flex-row justify-center pb-10"> {/* grid grid-cols-4 */}
                <div
                    className="w-full md:w-[700px] mt-6 flex flex-col"> {/* col-span-2 col-start-2 */}
                    <div className="card py-2 rounded-xl border-2 border-dotted border-base-content/10">
                        <ul className="steps text-xs">
                            <li className={`step ${step >= 1 && 'step-neutral'}`}>
                                <span className="step-icon text-base">
                                    <ProgressCircleInfinity showAnim={step === 1} text="🤔"/>
                                </span>意图分析
                            </li>
                            <li className={`step ${step >= 2 && (searchSuccess ? 'step-neutral' : 'step-error')}`}>
                                <span className="step-icon text-base">
                                    <ProgressCircleInfinity showAnim={step === 2} text="🧐"/>
                                </span>搜索中
                            </li>
                            <li className={`step ${step >= 3 && (aiSuccess ? 'step-neutral' : 'step-error')}`}>
                                <span className="step-icon text-base">
                                    <ProgressCircleInfinity showAnim={step === 3} text="🤯"/>
                                </span>回答中
                            </li>
                            <li className={`step ${step >= 4 && 'step-neutral'}`}>
                                <span className="step-icon text-base">
                                    <ProgressCircleInfinity text="🎉"/>
                                </span>搜索完毕
                            </li>
                        </ul>
                    </div>

                    <TransitionGroup>
                        {showAIPanel && aiSuccess && (() => {
                            const nodeRef = React.createRef();

                            return (
                                <CSSTransition timeout={500} classNames="fade" nodeRef={nodeRef}>
                                    <div ref={nodeRef}
                                         className="mt-10 collapse collapse-arrow border-base-content/10 border rounded-xl">
                                        <input type="checkbox" defaultChecked={true}/>

                                        <div className="collapse-title font-semibold">
                                            <ScrollText
                                                className="text-[10px] font-light rounded-lg bg-[#f8f8f8] px-2"
                                                text={aiReasoningContent}
                                                finished={thinkingFinished}/>
                                        </div>

                                        <div
                                            className={`px-4 w-full ${!onlyAIMode && 'max-h-[40vh]'} overflow-y-scroll text-sm prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 min-w-full space-y-6 break-words`}>
                                            <MessageMarkdown content={aiContent}/>
                                        </div>
                                    </div>
                                </CSSTransition>
                            )
                        })()}

                        {searchResult?.items?.map((item, i) => {
                            const nodeRef = React.createRef();

                            return (
                                <CSSTransition key={i} timeout={500} classNames="fade" nodeRef={nodeRef}>
                                    <div ref={nodeRef}
                                         className="w-full mt-10 p-4 card rounded-xl border border-base-content/10">
                                        <div className="flex flex-row items-center">
                                            <div className="avatar mr-2">
                                                <div className="w-5 rounded-full">
                                                    <img src={`https://${item.displayLink}/favicon.ico`}
                                                         onError={(e) => e.target.src = IconWebsite} alt=""/>
                                                </div>
                                            </div>

                                            <div
                                                className="text-xs text-base-content/50 overflow-hidden whitespace-nowrap text-ellipsis">{parse(item.htmlFormattedUrl || '')}</div>
                                        </div>

                                        <div className="text-base mt-2 cursor-pointer"
                                             onClick={() => window.open(item.link, '_blank')}>{parse(item.htmlTitle || '')}</div>

                                        <div
                                            className="text-sm text-base-content/70 mt-2">{parse(item.htmlSnippet || '')}</div>
                                    </div>
                                </CSSTransition>
                            )
                        })}
                    </TransitionGroup>
                </div>
            </div>

            <SettingDialog/>
        </div>
    );
};

export default Search;