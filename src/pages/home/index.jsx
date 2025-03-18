import {useNavigate} from "react-router-dom";
import React from "react";

import SearchInput from "@/common/components/searchInput/index.jsx";
import SettingDialog from "@/common/components/setting/index.jsx";

const Home = () => {
    const nav = useNavigate();

    const submit = (value) => {
        nav({
            pathname: "/search",
            search: `?q=${encodeURIComponent(value)}`,
        });
    }

    return (
        <div className="w-full px-6 md:px-0 h-screen flex flex-col items-center justify-center">
            <span className="font-lilitaone text-5xl -mt-20">Intsearch</span>

            <SearchInput className="mt-20 h-12" autoFocus={true} onSubmit={submit}/>

            <div className="absolute top-10 right-10">
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

            <SettingDialog/>
        </div>
    );
};

export default Home;