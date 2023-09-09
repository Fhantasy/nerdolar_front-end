interface props {
  message: string;
}

const DataNotFound = ({ message }: props) => {
  return (
    <div className="mt-3 ms-2 me-2 text-center">
      <p style={{ fontSize: "18px" }}>{message}</p>
    </div>
  );
};

export default DataNotFound;
