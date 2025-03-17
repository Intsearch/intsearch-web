import {useEffect, useRef} from "react";

const ScrollText = ({className, text, finished}) => {
    const divRef = useRef(null);

    useEffect(() => {
        if (divRef.current) {
            divRef.current.scrollTop = divRef.current.scrollHeight;
        }
    }, [text]);

    return (
        <div
            className={`transition-all duration-400 relative flex items-center justify-center ${!finished ? 'skeleton w-1/2 h-14' : 'w-24 h-8'} ${className}`}>
            <div className="w-full h-full overflow-y-auto whitespace-pre-wrap" ref={divRef}>{text}</div>

            <div
                className="absolute inset-0 rounded-lg bg-gradient-to-b from-[#f8f8f8]/100 via-transparent to-[#f8f8f8]/100"></div>

            <div
                className={`transition-opacity duration-400 ${finished ? 'opacity-100' : 'opacity-0'} flex items-center justify-center absolute w-full h-full rounded-lg bg-[#f8f8f8]`}>
                <div className="text-[11px] font-normal">😇 已思考完毕</div>
            </div>
        </div>
    );
};

export default ScrollText;