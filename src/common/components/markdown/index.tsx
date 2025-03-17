// @ts-ignore
import React, {FC} from "react"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import rehypeKatex from 'rehype-katex';
import remarkBreaks from "remark-breaks";
import 'katex/dist/katex.min.css';

import {MessageCodeBlock} from "./codeblock"
import {MessageMarkdownMemoized} from "./memoized"

interface MessageMarkdownProps {
    content: string
}

export const MessageMarkdown: FC<MessageMarkdownProps> = ({content}) => {
    return (
        <MessageMarkdownMemoized
            remarkPlugins={[remarkGfm, remarkMath, remarkBreaks]}
            rehypePlugins={[rehypeKatex]}
            components={{
                p({children}) {
                    // last:mb-0
                    return <p className="mb-2">{children}</p>
                },
                hr() {
                    return <div className="divider"/>
                },
                img({node, ...props}) {
                    return <img className="max-w-[67%]" {...props} alt=""/>
                },
                code({node, className, children, ...props}) {
                    const childArray = React.Children.toArray(children)
                    const firstChild = childArray[0] as React.ReactElement
                    const firstChildAsString = React.isValidElement(firstChild)
                        ? (firstChild as React.ReactElement).props.children
                        : firstChild

                    if (firstChildAsString === "▍") {
                        return <span className="mt-1 animate-pulse cursor-default">▍</span>
                    }

                    if (typeof firstChildAsString === "string") {
                        childArray[0] = firstChildAsString.replace("`▍`", "▍")
                    }

                    const match = /language-(\w+)/.exec(className || "")

                    if (
                        typeof firstChildAsString === "string" &&
                        !firstChildAsString.includes("\n")
                    ) {
                        return (
                            <code className={className} {...props}>
                                {childArray}
                            </code>
                        )
                    }

                    return (
                        <MessageCodeBlock
                            key={Math.random()}
                            language={(match && match[1]) || ""}
                            value={String(childArray).replace(/\n$/, "")}
                            {...props}
                        />
                    )
                }
            }}>
            {content}
        </MessageMarkdownMemoized>
    )
}