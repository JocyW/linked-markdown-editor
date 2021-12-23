export default (props:
{
    keywords: string[],
    className: string,
    onKeywordClick: (keyword: string) => void
}) => {
    return (<div className={props.className}>
        <h5>Keywords</h5>
        {props.keywords.map((keyword) => {
        return <div onClick={() => {props.onKeywordClick(keyword)}} key={keyword}>{keyword}</div>
    })}
    </div>)
}