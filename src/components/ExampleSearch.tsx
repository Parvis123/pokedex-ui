import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useQuery } from "react-query";

const fetchPokemon = async (name: string) => {
  const res = await fetch(`http://localhost:8000/pokemon/${name}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

const ExampleSearch = () => {
  const [search, setSearch] = useState<string>("");
  const { data, isError, error, refetch } = useQuery(
    ["pokemon", search],
    () => fetchPokemon(search),
    {
      enabled: false,
    }
  );

  const handleSearch = () => {
    refetch();
  };

  return (
    <>
      <TextField
        id="outlined-basic"
        label="Search pokemon here"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
      {isError && <div>Error: {(error as Error).message}</div>}
      {data && <div>{JSON.stringify(data)}</div>}
    </>
  );
};

export default ExampleSearch;
