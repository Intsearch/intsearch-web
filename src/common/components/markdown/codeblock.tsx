import {FC, memo} from "react"
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter"
import {oneDark} from "react-syntax-highlighter/dist/cjs/styles/prism"
import 'katex/dist/katex.min.css';
import {useCopyToClipboard} from "../../../utils/utils"

interface MessageCodeBlockProps {
    language: string
    value: string
}

export const MessageCodeBlock: FC<MessageCodeBlockProps> = memo(
    ({language, value}) => {
        const {isCopied, copyToClipboard} = useCopyToClipboard({timeout: 2000})

        const onCopy = () => {
            if (isCopied) return
            copyToClipboard(value)
        }

        return (
            <div className="codeblock bg-neutral rounded-lg relative w-full font-sans">
                <div className="flex w-full items-center justify-between rounded-t-lg p-4 text-white">
                    <span className="text-xs lowercase">{language}</span>

                    <div className="flex items-center space-x-1">
                        <div
                            className="text-xs cursor-pointer"
                            onClick={onCopy}>
                            <span>{isCopied ? '已复制' : '复制'}</span>
                        </div>
                    </div>
                </div>

                <SyntaxHighlighter
                    language={language}
                    style={oneDark}
                    // 控制代码背景样式
                    customStyle={{
                        margin: 0,
                        width: "100%",
                        background: "transparent"
                    }}
                    // 控制代码文本样式
                    codeTagProps={{
                        style: {
                            fontSize: "14px",
                            fontFamily: "var(--font-mono)"
                        }
                    }}>
                    {value}
                </SyntaxHighlighter>
            </div>
        )
    }
)

MessageCodeBlock.displayName = "MessageCodeBlock"