import "./Card.css";

interface MovieProps {
  src: string;
  title: string;
}

export const Card = ({ src, title }: MovieProps) => {
  return (
    <div className="Card">
      <img
        className="image"
        src={`https://image.tmdb.org/t/p/w500${src}`}
      ></img>
      <div className="CardTitle" id="title">
        {title}
      </div>
    </div>
  );
};
