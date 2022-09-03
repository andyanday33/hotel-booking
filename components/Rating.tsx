import React from "react";

type Props = {
  rating: number;
  numberOfReviews: number;
  roomName: string;
  readOnly?: boolean;
};

const Rating = ({
  rating,
  numberOfReviews,
  roomName,
  readOnly = false,
}: Props) => {
  return (
    <section className="ratings flex ml-0 pl-0 m-2">
      <div className="rating rating-md rating-half pl-0 ml-0">
        {/* Default checked hidden rating for 0 pointed postings */}
        <input
          type="radio"
          name={`rating-${roomName}`}
          className="rating-hidden hidden"
          checked={rating === 0}
          readOnly={readOnly}
        />
        {/* Other rating stars */}
        {[...Array(5)].map((x, i) => (
          <React.Fragment key={i}>
            <input
              type="radio"
              name={`rating-${roomName}`}
              className="bg-orange-400 mask mask-star-2 mask-half-1"
              checked={i < rating && i + 0.5 >= rating}
              readOnly={readOnly}
            />
            <input
              type="radio"
              name={`rating-${roomName}`}
              className="bg-orange-400 mask mask-star-2 mask-half-2"
              checked={i + 0.5 < rating && i + 1 >= rating}
              readOnly={readOnly}
            />
          </React.Fragment>
        ))}
      </div>
      <p className="text-sm pl-2 my-auto">({numberOfReviews} Reviews)</p>
    </section>
  );
};

export default Rating;
