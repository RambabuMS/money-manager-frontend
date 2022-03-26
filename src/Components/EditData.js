import { useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function EditData() {
  const history = useHistory();

  const { id } = useParams();
  const [data, setData] = useState([]);
  //   useEffect(() => {
  //     const loadData = async () => {
  //       var response = await axios.get(`http://localhost:5000/transaction/${id}`);
  //       setData(response.data);
  //     };
  //     loadData();
  //   }, []);

  useEffect(() => {
    fetch(`$https://me-expense-tracker.herokuapp.com/transaction/${id}`, {
      method: "GET",
    }) //promise
      .then((data) => data.json()) //Response Object
      .then((pls) => setData(pls))
      .catch((err) => console.log(err));
  }, [id]);

  const [income, setIncome] = useState(data.income);
  const [expense, setExpense] = useState(data.expense);

  return (
    <div>
      <h1>Here You can Edit your Income and Expense</h1>
      <div className="edit">
        <TextField
          className="text"
          label="Car Name"
          variant="outlined"
          margin="dense"
          value={income}
          onChange={(event) => setIncome(event.target.value)}
        />
        <TextField
          className="text"
          label="Poster"
          variant="outlined"
          margin="dense"
          value={expense}
          onChange={(event) => setExpense(event.target.value)}
        />
        <Button
          variant="contained"
          onClick={() => {
            const updatedata = {
              income: income,
              expense: expense,
            };
            console.log(updatedata);
            fetch(
              `https://me-expense-tracker.herokuapp.com/transaction/${data._id}`,
              {
                method: "PUT",
                body: JSON.stringify(updatedata),
                headers: {
                  "content-type": "application/json",
                },
              }
            ).then(() => history.push("/weekly"));
          }}
          color="success"
        >
          Save
        </Button>
      </div>
    </div>
  );
}
