import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "./components/SearchResult/SearchResult";

export const BASE_URL = "http://localhost:9000";
const App = () => {
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [filteredData, setfilteredData] = useState(null);
  const [selectedBtn, setselectedBtn] = useState("all");

  useEffect(() => {
    const fetchFoodData = async () => {
      // fetch() is a api to perform network calls in javascript

      setloading(true);
      try {
        const response = await fetch(BASE_URL);

        const json = await response.json();
        setdata(json);
        setfilteredData(json);
        setloading(false);
      } catch (error) {
        seterror("Unable to fetch Data");
      }
    };
    fetchFoodData();
  }, []);

  const SearchFood = (e) => {
    const searchValue = e.target.value;

    if (searchValue === "") {
      setfilteredData(null);
    }

    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setfilteredData(filter);
  };

  const filterFood = (type) => {
    if (type === "all") {
      setfilteredData(data);
      setselectedBtn("all");
      return;
    }

    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setfilteredData(filter);
    setselectedBtn(type);
  };

  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading .......</div>;
  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="/logo.svg" alt="logo" />
          </div>

          <div className="search">
            <input
              className="border-b-8 border-red-600"
              placeholder="Search Food..."
              onChange={SearchFood}
            />
          </div>
        </TopContainer>

        <FilterContainer>
          <Button onClick={() => filterFood("all")}>All</Button>
          <Button onClick={() => filterFood("breakfast")}>Breakfast</Button>
          <Button onClick={() => filterFood("lunch")}>Lunch</Button>
          <Button onClick={() => filterFood("dinner")}>Dinner</Button>
        </FilterContainer>
      </Container>
      <SearchResult data={filteredData} />
    </>
  );
};

export default App;

export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;
const TopContainer = styled.div`
  height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 100%;
      font-size: 16px;
      padding: 0 10px;
      &::placeholder{
        color: white;
      }
    }
  }

  @media (0 < width < 600px) {
    flex-direction: column;
    height: 120px;
  }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding-bottom: 40px;
`;

export const Button = styled.button`
  background: #ff4343;
  gap: 10px;
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #cd1515;
  }
`;

const FoodContainer = styled.section`
  height: calc(100vh - 210px);
  background-image: url("/bg.png");
  background-size: cover;
`;
const FoodCards = styled.div``;
