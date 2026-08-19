export const Meal = ({
  meal,
  mealName,
  mealPrice,
  selected,
  onSelect,
}) => {
  const getMealType = () => {
    const text = `
      ${meal?.SSR_TypeName || ""}
      ${meal?.SSR_TypeDesc || ""}
      ${meal?.SSR_Name || ""}
      ${meal?.Meal_Name || ""}
      ${meal?.MealName || ""}
      ${meal?.Description || ""}
      ${meal?.SSR_Code || ""}
    `.toLowerCase();

    if (
      text.includes("non veg") ||
      text.includes("non-veg") ||
      text.includes("nonveg")
    ) {
      return "nonveg";
    }

    return "veg";
  };

  const mealType = getMealType();

  return (
    <div
      className={`duinweuirhwer rounded-2 border p-3 d-flex gap-3 ${
        selected ? "border-primary" : ""
      }`}
      style={{
        cursor: "pointer",
      }}
      onClick={() => onSelect(meal)}
    >
      {/* ============================================================
          IMAGE
      ============================================================ */}

      <div
        className="idnieuhrewr position-relative rounded-1 overflow-hidden"
        style={{
          width: "110px",
          minWidth: "110px",
          height: "100px",
        }}
      >
        <img
          src="/images/insta8.png"
          alt={mealName || "Meal"}
          className="img-fluid w-100 object-fit-cover h-100"
        />

        <img
          src={
            mealType === "nonveg"
              ? "/images/nonveg.png"
              : "/images/veg.png"
          }
          style={{
            width: "1rem",
          }}
          className="img-fluid bg-white m-1 position-absolute bottom-0 start-0"
          alt=""
        />
      </div>

      {/* ============================================================
          CONTENT
      ============================================================ */}

      <div className="diheifsdf flex-grow-1">
        <p
          className="mb-2"
          style={{
            fontWeight: 600,
          }}
        >
          {mealName || "Meal"}
        </p>

        <div className="oidmejwijrwer d-flex align-items-center justify-content-between">
          <h6 className="mb-0">
            <b>
              {meal?.Currency_Code || "INR"} {mealPrice || 0}
            </b>
          </h6>

          <button
            type="button"
            className={`rounded-1 py-1 px-3 btn ${
              selected
                ? "bg-primary text-white"
                : "bg-white border-primary text-primary"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(meal);
            }}
          >
            {selected ? "ADDED" : "ADD"}
          </button>
        </div>
      </div>
    </div>
  );
};