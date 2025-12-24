import Spinner from "@/components/SvgComponents/Spinner";

const Loading = () => {
    return (
        <div className="flex items-center justify-center">
            <Spinner widthHeight="h-[45px] h-[45px]" />
        </div>
    );
};

export default Loading;
