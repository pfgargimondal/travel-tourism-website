export const ChildFields = (child, index, childRule, handleChildChange) => (
    <div className="row g-3">

        {childRule?.Title && (
            <div className="col-md-2">
            <label>Title</label>
            <select
                className="form-select"
                value={child.title}
                onChange={(e) =>
                handleChildChange(index, "title", e.target.value)
                }
            >
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Miss">Miss</option>
            </select>
            </div>
        )}

        {childRule?.First_Name && (
            <div className="col-md-5">
            <label>First Name</label>
            <input
                className="form-control"
                value={child.firstName}
                onChange={(e) =>
                handleChildChange(index, "firstName", e.target.value)
                }
            />
            </div>
        )}

        {childRule?.Last_Name && (
            <div className="col-md-5">
            <label>Last Name</label>
            <input
                className="form-control"
                value={child.lastName}
                onChange={(e) =>
                handleChildChange(index, "lastName", e.target.value)
                }
            />
            </div>
        )}
        {childRule?.DOB && (
            <div className="col-md-4">

                <label>Date of Birth</label>

                <input
                    type="date"
                    className="form-control"
                    value={child.dob}
                    onChange={(e)=>
                        handleChildChange(index,"dob",e.target.value)
                    }
                />

            </div>
        )}

    </div>
);