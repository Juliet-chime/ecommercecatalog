const Loader = ({ component, ...props }) => {
  const LoadingComponent = component;
  const { width, height, color } = props;
  return (
    <LoadingComponent
      visible={true}
      height={height || "70"}
      width={width || "70"}
      ariaLabel="color-ring-loading"
      wrapperStyle={{}}
      wrapperClass="color-ring-wrapper"
      colors={color}
      {...props}
    />
  );
};

export default Loader;
