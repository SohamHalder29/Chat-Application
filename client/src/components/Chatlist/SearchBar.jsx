import React from 'react'
import {BiSearchAlt2} from 'react-icons/bi'
const SearchBar = () => {
  return (
    <div className={'bg-search-input-container-background flex py-3 px-5 items-center gap-3 h-16 '} >
    <div className={'bg-panel-header-background flex items-center gap-5 px-3 py-3 rounded-lg flex-grow'} >
    <div> 
    <BiSearchAlt2 className={'text-panel-header-icon cursor-pointer text-lg'} />
    </div>
    </div>
    </div>
  )
}

export default SearchBar