const keywordRegex = /\$(\S+?)\b/gim

export const getKeywords = (text: string):string[] => {
    const results = text.match(keywordRegex);

    if(!results) return []
    const arr = results.map((result) => result.slice(1));

    // @ts-ignore
    return [...new Set(arr)]
}

export const replaceKeywordsWithLinks = (text:string): string =>  {
    return text.replaceAll(keywordRegex,(match) => {
        const keyword = match.slice(1)
        return `[${keyword}](/keyword:${keyword})`
    })
}