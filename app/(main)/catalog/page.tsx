'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { TokenService } from '@/api/services/Token.service';
import { Paper, useMediaQuery } from '@mui/material';
import Searchbar from '@/components/catalog/SearchBar';
import { SearchParams, FilterParams } from '@/types/types';
import { actions as searchActions } from '@/redux/slices/searchSlice/searchSlice';
import { useDispatch, useSelector } from '@/redux/store';
import CategorySelector from '@/components/catalog/CategorySelector';
import { getSearchProductsAsync } from '@/redux/slices/searchSlice/thunks';
import FilterBlock from '@/components/catalog/Filter';
import SortMenu from '@/components/catalog/SortMenu';
import CategoryBreadcrumbs from '@/components/catalog/CategoryBreadcrumbs';
import Paginator from '@/components/catalog/Paginator';
import { CurrencyParams, PaginationParams } from '@/types/enums';
import CatalogProductsContainer from '@/components/catalog/CatalogProductsContainer';
import { ResponseSearchProduct } from '@/types/catalog/interface';
import FsPopover from '@/components/catalog/FilterMenu';

const Catalog = () => {
  const dispatch = useDispatch();
  const { search, checkboxState, priceRange, categoryId, sortIndex, paginatorPage } = useSelector(
    state => state.search
  );
  const { access_token, token_type } = useSelector(state => state.auth);
  const [totalResults, setTotalResults] = useState(0);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [catalogData, setCatalogData] = useState<{ total: number; results: ResponseSearchProduct[] } | null>(null);
  const [isToken, setIsToken] = useState(access_token !== null);
  const matches = useMediaQuery('(max-width:768px)');
  const [categoryPopoverOpen, setCategoryPopoverOpen] = useState<HTMLButtonElement | null>(null);
  const [filterPopoverOpen, setFilterPopoverOpen] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, name: string) => {
    if (name === 'filter') {
      setFilterPopoverOpen(event.currentTarget);
    } else setCategoryPopoverOpen(event.currentTarget);
  };

  const handleClose = () => {
    setCategoryPopoverOpen(null);
    setFilterPopoverOpen(null);
  };

  useEffect(() => {
    setIsToken(function (prev: boolean) {
      return !prev && token_type !== null ? true : prev;
    });
  }, [token_type]);

  const fetchSearchProducts = useCallback(
    async (accessToken: string, searchParams?: SearchParams, filterParams?: FilterParams, priceParams?: number[]) => {
      setIsLoadingData(true);
      setIsSearchActive(true);
      if (!accessToken) return;

      const response = await dispatch(
        getSearchProductsAsync({
          token: accessToken,
          paginatorPage,
          searchParams,
          filterParams,
          priceParams,
          categoryId,
          sortIndex,
        })
      ).unwrap();
      setTotalResults(response.total);
      setCatalogData(response);
      setIsLoadingData(false);
    },
    [dispatch, categoryId, sortIndex, isToken, paginatorPage]
  );

  useEffect(() => {
    let filterOptions: FilterParams = {};

    for (const filterIdState in checkboxState) {
      const options = checkboxState[filterIdState];
      for (const optionKeyState in options) {
        if (options[optionKeyState]) {
          if (filterOptions[filterIdState]) {
            filterOptions[filterIdState].push(optionKeyState);
          } else {
            filterOptions[filterIdState] = [optionKeyState];
          }
        }
      }
    }

    const tokenLS = TokenService.getAccessTokenFromLS();
    const tokenForSearch = access_token ? access_token : tokenLS?.token;

    if (tokenForSearch) {
      fetchSearchProducts(
        tokenForSearch,
        { 'text.en': search, fuzzy: true, priceCurrency: CurrencyParams.EUR_TEXT },
        filterOptions,
        priceRange
      );
    }
  }, [search, checkboxState, priceRange, dispatch, fetchSearchProducts]);

  return (
    <section className='catalog page'>
      <h1 className='page__title'>Catalog</h1>
      <CategoryBreadcrumbs categoryId={categoryId} />
      <div className='catalog-page-wrapper'>
        {matches ? (
          <>
            <div id='category' className='settings__btn'>
              <FsPopover
                anchorEl={categoryPopoverOpen}
                handleClick={(event: React.MouseEvent<HTMLButtonElement>) => handleClick(event, 'category')}
                handleClose={handleClose}
                name='category'
                idElem='category'>
                <CategorySelector />
              </FsPopover>
            </div>
            <div id='filter' className='settings__btn'>
              <FsPopover
                anchorEl={filterPopoverOpen}
                handleClick={(event: React.MouseEvent<HTMLButtonElement>) => handleClick(event, 'filter')}
                handleClose={handleClose}
                name='filter'
                idElem='filter'>
                <FilterBlock />
              </FsPopover>
            </div>
          </>
        ) : (
          <Paper className='settings' elevation={0} id='settings'>
            <CategorySelector />
            <FilterBlock />
          </Paper>
        )}

        <Searchbar
          onSubmit={(newSearchItem: string) => {
            dispatch(searchActions.setSearch(newSearchItem));
          }}
          onClear={() => dispatch(searchActions.setSearch(''))}
          value={search}
          onChange={value => dispatch(searchActions.setSearch(value))}
          inputProps={{}}
        />
        <SortMenu />
        <div className='catalog-wrapper' id='catalog'>
          <CatalogProductsContainer
            isLoadingData={isLoadingData}
            isSearchActive={isSearchActive}
            productsPage={catalogData}
            search={search}
            totalResults={totalResults}
          />
          <Paginator count={Math.ceil(totalResults / PaginationParams.LIMIT)} />
        </div>
      </div>
    </section>
  );
};

export default Catalog;
