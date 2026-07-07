const Container = ({ children }) => {
  return (
    <div className="mx-auto max-w-[1280px] px-8">
      {children}
    </div>
  );
};

export default Container;