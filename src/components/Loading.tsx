interface LoadingProps {
    message?: string;
}
const Loading = (props: LoadingProps) => (
    <div>
        <p>Loading...</p>
        <p>{props.message}</p>
    </div>
)

export default Loading;