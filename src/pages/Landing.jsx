import axios from "axios";
import { useLoaderData } from "react-router-dom";
import CocktailList from "../components/CocktailList";
import SearchForm from "../components/SearchForm";
import { useQuery } from "@tanstack/react-query";

const cocktailSearchUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const searchCocktailsQuery = (searchTerm) => {
    return {
        queryKey: ['search', searchTerm || 'all'],
        queryFn: async () => {
            const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
            return response.data.drinks;
        }
    }
}

export const loader = (queryClient) => async ({request}) => {
    const url = new URL(request.url);
    
    const searchTerm = url.searchParams.get('search') || 'a';
    // || String.fromCharCode(Math.floor(Math.random()*26)+97); //to generate random char code
    // const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
    await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm));
    return {searchTerm};
};

const Landing = () => {
    const { searchTerm } = useLoaderData();
    const { data:drinks, isLoading } = useQuery(searchCocktailsQuery(searchTerm));

    if(isLoading) return <h1>It is loading</h1>
    return <>
    <SearchForm searchTerm={searchTerm} />
    <CocktailList drinks={drinks} />
    </>;
}

export default Landing; 