import React, {useRef, useState} from "react";

const SearchInput = ({className, currentValue, onSubmit}) => {
    const [keywords, setKeywords] = useState(currentValue || '');
    const [isComposing, setIsComposing] = useState(false);

    const shouldSubmitOnCompositionEnd = useRef(false);

    const handleCompositionStart = () => {
        setIsComposing(true);
    };

    const handleCompositionEnd = (e) => {
        setIsComposing(false);
        setKeywords(e.target.value); // 更新输入值

        // 若在输入法时点了Enter，则提交
        if (shouldSubmitOnCompositionEnd.current) {
            submitInputValue(e.target.value);
            shouldSubmitOnCompositionEnd.current = false;
        }
    };

    const onEnter = (e) => {
        if (e.key === 'Enter') {
            if (isComposing) {
                // 标记需在compositionEnd后提交，一般不需要
                shouldSubmitOnCompositionEnd.current = false;
                // 阻止默认行为以防输入法内部行为
                // e.preventDefault(); // 根据需求决定是否阻止
            } else {
                // 非输入法状态，立即提交
                submitInputValue(e.target.value);
            }
        }
    }

    const submitInputValue = (value) => {
        // 执行提交逻辑
        if (!value || !value.trim()) {
            return;
        }

        onSubmit(value);
    };

    return (
        <label className={`input w-full md:max-w-[700px] rounded-full ${className}`}>
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none"
                   stroke="currentColor">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                </g>
            </svg>

            <input type="search" value={keywords} placeholder="想要搜索什么？"
                   onChange={({target: {value}}) => setKeywords(value)}
                   onKeyDown={onEnter}
                   onCompositionStart={handleCompositionStart}
                   onCompositionEnd={handleCompositionEnd}/>
        </label>
    )
}

export default SearchInput;