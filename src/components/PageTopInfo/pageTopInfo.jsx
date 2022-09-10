import "./style.scss";

export const PageTopInfo = ({pageName, title}) => {
  return (
    <div className="page-top-info">
      <div className="container">
        <h4>{title}</h4>
        <div className="site-pagination">
          <a href="">Home</a> /<a href="">{pageName}</a>
        </div>
      </div>
    </div>
  );
};
