type LoadingOverlayProps = {
    isLoading: boolean;
    message?: string;
};

const LoadingOverlay = ({ isLoading, message }: LoadingOverlayProps) => {
    return (
        <>
            {isLoading &&

                (
                    <div
                        className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-75 z-50 flex items-center justify-center">
                        <div className="text-white text-xl font-bold">{message || "Loading"}</div>
                        <div className="mt-4 ml-2 flex space-x-2 self-center">
                            <div
                                className="h-1 w-1 bg-white rounded-full animate-bounce transform translate-y-1.5 animation"></div>
                            <div
                                className="h-1 w-1 -mx-2 bg-white rounded-full animate-bounce delay-100 transform translate-y-1.5 animation"></div>
                            <div
                                className="h-1 w-1 -mx-2 bg-white rounded-full animate-bounce delay-200 transform translate-y-1.5 animation"></div>
                        </div>
                        {/*<div className="mt-2 ml-2">*/}
                        {/*    <Loader2 className="mr-2 h-8 w-8 animate-spin text-white"/>*/}
                        {/*</div>*/}
                    </div>
                )
            }
        </>
    );
};

export default LoadingOverlay;