import SpinnerComponent from "../spinner";

interface props {
  dataEnded: boolean;
  message?: string;
  id?: string;
}
const PageBottom = ({ dataEnded, message, id }: props) => {
  return (
    <div id={id || "pageBottom"} className="text-center mt-3 mb-3">
      {dataEnded ? (
        <p>{message ? message : "Não tem mais postagens por enquanto :("}</p>
      ) : (
        <SpinnerComponent />
      )}
    </div>
  );
};

export default PageBottom;
