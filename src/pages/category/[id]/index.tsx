import React, { ReactElement, useEffect, useState } from "react";
import UserLayout from "@/components/Layout/UserLayout";
import ProductCard from "@/components/Card/ProductCard";
import CategoryIcon from "@/components/CategoryIcon/CategoryIcon";
import { GetServerSideProps } from "next";
import { ratingFormat } from "@/utils/uniUtils";
import { IProduct } from "@/pages";
import { useProducts } from "@/store/products/useProducts";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BiFilterAlt } from "react-icons/bi";
import { GrFormNextLink } from "react-icons/gr";
import { FilterSearchForm } from "@/components/Form/FilterSearchForm";
import Link from "next/link";
import { useFilter } from "@/store/filter/useFilter";
import Head from "next/head";
import { IPaginationData } from "@/interfaces/pagination";
import UniPagination from "@/components/Pagination/UniPagination";

export interface ICategory {
  id: string;
  name: string;
  icon: string;
  category_lv_2?: ICategory[];
}

export interface ICategoryProductsProps {
  products: IProduct[];
  category: ICategory;
  pagination_info: IPaginationData;
}

const ProductsWithCategory = ({
  products,
  category,
  pagination_info,
}: ICategoryProductsProps) => {
  const { setProducts, getFilterSortSearch, setPaginationInfo } =
    useProducts.getState();
  const { setSortBy, setSort, setCategory } = useFilter.getState();

  setCategory(category.id);

  const productsData = useProducts.use.products();
  const pageInformation = useProducts.use.pageInformation();
  const locationFilter = useFilter.use.location();
  const minPriceFilter = useFilter.use.min_price();
  const maxPriceFilter = useFilter.use.max_price();
  const minRatingFilter = useFilter.use.min_rating();
  const [filter, setFilter] = useState("");
  const [pageManagement, setPageManagement] = useState<{
    page: number;
  }>({
    page: 1,
  });

  useEffect(() => {
    setPageManagement({ page: 1 });
  }, [category]);

  useEffect(() => {
    if (products && pageManagement.page === 1) {
      setProducts(products);
      setPaginationInfo(pagination_info);
    }

    if (products && pageManagement.page > 1) {
      if (filter === "") {
        getFilterSortSearch(
          "",
          "",
          "",
          category.id,
          locationFilter as string,
          minPriceFilter as string,
          maxPriceFilter as string,
          minRatingFilter as string,
          pageManagement.page,
        );
      }
      if (filter === "latest") {
        setSortBy("date");
        setSort("desc");
        getFilterSortSearch(
          "",
          "date",
          "desc",
          category.id,
          locationFilter as string,
          minPriceFilter as string,
          maxPriceFilter as string,
          minRatingFilter as string,
          pageManagement.page,
        );
      }
      if (filter === "most_purchased") {
        setSortBy("total_sold");
        setSort("desc");
        getFilterSortSearch(
          "",
          "total_sold",
          "desc",
          category.id,
          locationFilter as string,
          minPriceFilter as string,
          maxPriceFilter as string,
          minRatingFilter as string,
          pageManagement.page,
        );
      }
      if (filter === "expensive") {
        setSortBy("price");
        setSort("desc");
        getFilterSortSearch(
          "",
          "price",
          "desc",
          category.id,
          locationFilter as string,
          minPriceFilter as string,
          maxPriceFilter as string,
          minRatingFilter as string,
          pageManagement.page,
        );
      }
      if (filter === "cheapest") {
        setSortBy("price");
        setSort("asc");
        getFilterSortSearch(
          "",
          "price",
          "asc",
          category.id,
          locationFilter as string,
          minPriceFilter as string,
          maxPriceFilter as string,
          minRatingFilter as string,
          pageManagement.page,
        );
      }
    }
  }, [products, pageManagement]);

  const onClickChangePage = (key: string, value: number) => {
    setPageManagement({
      ...pageManagement,
      [key]: value,
    });
  };

  const onClickNextChangePage = (key: string) => {
    setPageManagement({
      ...pageManagement,
      [key]: pageManagement.page + 1,
    });
  };

  const onClickPrevChangePage = (key: string) => {
    setPageManagement({
      ...pageManagement,
      [key]: pageManagement.page - 1,
    });
  };

  if (category.category_lv_2) {
    for (let i = 0; i < category.category_lv_2.length; i++) {
      if (category.category_lv_2[i].name == "Others") {
        category.category_lv_2.push(category.category_lv_2.splice(i, 1)[0]);
      }
    }
  }

  function setQuery(value: string) {
    if (value === "latest") {
      setSortBy("date");
      setSort("desc");
      getFilterSortSearch(
        "",
        "date",
        "desc",
        category.id,
        locationFilter as string,
        minPriceFilter as string,
        maxPriceFilter as string,
        minRatingFilter as string,
        pageManagement.page,
      );
    }
    if (value === "most_purchased") {
      setSortBy("total_sold");
      setSort("desc");
      getFilterSortSearch(
        "",
        "total_sold",
        "desc",
        category.id,
        locationFilter as string,
        minPriceFilter as string,
        maxPriceFilter as string,
        minRatingFilter as string,
        pageManagement.page,
      );
    }
    if (value === "expensive") {
      setSortBy("price");
      setSort("desc");
      getFilterSortSearch(
        "",
        "price",
        "desc",
        category.id,
        locationFilter as string,
        minPriceFilter as string,
        maxPriceFilter as string,
        minRatingFilter as string,
        pageManagement.page,
      );
    }
    if (value === "cheapest") {
      setSortBy("price");
      setSort("asc");
      getFilterSortSearch(
        "",
        "price",
        "asc",
        category.id,
        locationFilter as string,
        minPriceFilter as string,
        maxPriceFilter as string,
        minRatingFilter as string,
        pageManagement.page,
      );
    }
  }

  if (!pageInformation || !productsData) {
    return (
      <>
        <Head>
          <title>Search | Platypus</title>
          <meta name="platypus" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="min-w-screen flex min-h-screen flex-col items-center justify-center pt-12 md:px-28 md:pt-28 2xl:px-72">
          <span className="loading loading-dots loading-lg text-primary"></span>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Search | Platypus</title>
        <meta name="platypus" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-w-screen flex min-h-screen flex-col items-center pt-12 md:px-28 md:pt-28 2xl:px-72">
        <div className="w-[93%] md:w-full">
          <div className="mt-5 w-full">
            <div className="flex items-center gap-2">
              <Link
                href={`/`}
                className="font-semibold text-primary hover:text-black"
              >
                Home
              </Link>
              <GrFormNextLink />
              <Link
                href={`/category`}
                className="font-semibold text-primary hover:text-black"
              >
                Categories
              </Link>
              <GrFormNextLink />
              <Link
                href={`/category/${category.id.toLowerCase()}`}
                className="font-semibold text-primary hover:text-black"
              >
                {category.name}
              </Link>
            </div>
            <div
              className={`${
                category.category_lv_2 === undefined && "hidden"
              } grid auto-cols-repeat-cat-s grid-flow-col grid-cols-repeat-fill-s overflow-x-scroll py-4 md:auto-cols-repeat-cat-m md:grid-cols-repeat-fill-m md:py-9`}
            >
              {category.category_lv_2 &&
                category.category_lv_2.map((item: ICategory) => {
                  return (
                    <CategoryIcon
                      key={item.id}
                      label={item.name}
                      icon={item.icon}
                      id2={item.id}
                      id={category.id}
                    />
                  );
                })}
            </div>
          </div>
          <div className="mb-10 mt-5 w-full">
            <div className="mt-5 w-full md:flex lg:gap-5 xl:gap-10">
              <div className="hidden lg:block">
                <div className="flex items-center">
                  <BiFilterAlt />
                  <p className="font-medium">&nbsp;Filter Search</p>
                </div>
                <p className="pb-5 text-sm">Choose your filters.</p>
                <FilterSearchForm />
              </div>
              <div className="flex-1">
                <Select
                  onValueChange={(e) => {
                    setQuery(e);
                    setFilter(e);
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Sort by</SelectLabel>
                      <SelectItem value="latest">Latest</SelectItem>
                      <SelectItem value="most_purchased">
                        Most Purchased
                      </SelectItem>
                      <SelectItem value="expensive">Most expensive</SelectItem>
                      <SelectItem value="cheapest">Cheapest</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <div className="mt-5 flex justify-center">
                  {productsData.length == 0 ? null : (
                    <UniPagination
                      onClickChangePage={onClickChangePage}
                      onClickNextChangePage={onClickNextChangePage}
                      onClickPrevChangePage={onClickPrevChangePage}
                      pageInformation={pageInformation}
                    />
                  )}
                </div>
                <div className="grid min-w-[348px] grid-cols-2-prod-card justify-evenly gap-2 gap-y-3 py-10 md:grid-cols-4-prod-card md:justify-center md:gap-4 md:gap-y-10">
                  {productsData.length == 0 && (
                    <div className="">
                      <p className="md:px-1">No products to show.</p>
                    </div>
                  )}
                  {productsData.map((item: IProduct) => {
                    return (
                      <ProductCard
                        id={item.id}
                        url={item.photo}
                        key={item.id}
                        name={item.title}
                        price={parseInt(item.min_price)}
                        rating={ratingFormat(item.average_rating)}
                        city={item.city}
                        sold={item.total_sold}
                      />
                    );
                  })}
                </div>
                <div className="mt-5 flex justify-center">
                  {productsData.length == 0 ? null : (
                    <UniPagination
                      onClickChangePage={onClickChangePage}
                      onClickNextChangePage={onClickNextChangePage}
                      onClickPrevChangePage={onClickPrevChangePage}
                      pageInformation={pageInformation}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

ProductsWithCategory.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: any) => {
  if (params.id[3] != "1") {
    return {
      notFound: true,
    };
  }
  const responseProducts = await fetch(
    `${process.env.BASE_API_URL}/products?category=${params.id}`,
  );
  const resultJSONProducts = await responseProducts.json();
  const products = resultJSONProducts.data;
  const pagination_info = resultJSONProducts.meta.pagination_info;

  const responseCategory = await fetch(
    `${process.env.BASE_API_URL}/categories/${params.id}`,
  );
  const resultJSONCategory = await responseCategory.json();
  const category = resultJSONCategory.data;
  if (!category) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      products,
      category,
      pagination_info,
    },
  };
};

export default ProductsWithCategory;
