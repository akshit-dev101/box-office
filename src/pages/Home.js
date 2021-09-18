import React, { useState } from 'react';
import ActorGrid from '../components/actor/ActorGrid';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';

const Home = () => {
    const [input, setInput] = useState('');
    const [results, setResults] = useState(null);
    const [searchOptions, setSearchOptions] = useState('shows');
    const isShowsSearch = searchOptions === 'shows';




    const onSearch = () => {
        apiGet(`/search/${searchOptions}?q=${input}`).then(result => {
            setResults(result);
        })


    }
    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            onSearch();
        }

    };

    const onInputChange = (e) => {
        setInput(e.target.value);

    };


    const renderResults = () => {
        if (results && results.length === 0) {
            return <div>No Results</div>
        }
        if (results && results.length > 0) {
            return results[0].show ? (<ShowGrid data={results} />) :
                (<ActorGrid data={results} />)
        }


        return null;
    }

    const onRadioChange = (e) => {
        setSearchOptions(e.target.value);
    }

    return (
        <MainPageLayout>
            <input type="text" placeholder="Search for something" onChange={onInputChange} onKeyDown={onKeyDown} value={input} />

            <div>
                <label htmlFor="shows-search">
                    Shows
                    <input id="shows-search" type="radio" value="shows" checked={isShowsSearch} onChange={onRadioChange} />
                </label>

                <label htmlFor="actors-search">
                    Actors
                    <input id="actors-search" type="radio" value="people" checked={!isShowsSearch} onChange={onRadioChange} />
                </label>
            </div>

            <button type="button" onClick={onSearch}>Search</button>
            {renderResults()}
        </MainPageLayout>
    )
}

export default Home
