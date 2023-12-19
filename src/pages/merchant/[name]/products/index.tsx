import React, { ReactElement, useEffect, useState } from "react";
import MerchantLayout from "@/components/Layout/MerchantLayout";
import ProductCard from "@/components/Card/ProductCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GetServerSideProps } from "next";
import { IMerchant } from "..";
import { useMerchant } from "@/store/merchant/useMerchant";
import { ratingFormat } from "@/utils/uniUtils";
import { IPaginationData } from "@/interfaces/pagination";
import Head from "next/head";
import UniPagination from "@/components/Pagination/UniPagination";

export interface IProduct {
  id: number;
  merchant_id: number;
  title: string;
  photo: string;
  videos: string;
  total_sold: number;
  favorite_count: number;
  average_rating: number;
  total_stock: number;
  city: string;
  category_lv1_id: string;
  category_lv2_id: string;
  category_lv3_id: string;
  min_price: string;
  created_at: string;
  updated_at: string;
}

interface ICategoryMerchant {
  id: string;
  category: string;
}

export interface IProductsProps {
  products: IProduct[];
  merchant: IMerchant;
  categories: ICategoryMerchant[];
  pagination_info: IPaginationData;
}

const MerchantProducts = ({
  products,
  merchant,
  categories,
  pagination_info,
}: IProductsProps) => {
  const { setMerchant, setProducts, getSortedBy, setCat } =
    useMerchant.getState();
  const merchantData = useMerchant.use.merchant();
  const pageInformation = useMerchant.use.pageInformation();
  const productsData = useMerchant.use.products();
  const { setPaginationInfo } = useMerchant.getState();
  const cat = useMerchant.use.cat();
  const [sort_by, setSortBy] = useState("");
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");
  const [pageManagement, setPageManagement] = useState<{
    page: number;
  }>({
    page: 1,
  });

  useEffect(() => {
    setPageManagement({ page: 1 });
  }, [sort_by, sort]);

  useEffect(() => {
    if (merchant && pageManagement.page === 1) {
      setMerchant(merchant);
      setProducts(products);
      setPaginationInfo(pagination_info);
    }

    if (merchant && pageManagement.page > 1) {
      if (filter === "") {
        getSortedBy(
          merchant.user_name,
          "",
          "",
          cat as string,
          pageManagement.page,
        );
      }
      if (filter === "latest") {
        setSortBy("date");
        setSort("desc");
        getSortedBy(
          merchant.user_name,
          "date",
          "desc",
          cat as string,
          pageManagement.page,
        );
      }
      if (filter === "expensive") {
        setSortBy("price");
        setSort("desc");
        getSortedBy(
          merchant.user_name,
          "price",
          "desc",
          cat as string,
          pageManagement.page,
        );
      }
      if (filter === "cheapest") {
        setSortBy("price");
        setSort("asc");
        getSortedBy(
          merchant.user_name,
          "price",
          "asc",
          cat as string,
          pageManagement.page,
        );
      }
    }
  }, [merchant, pageManagement]);

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

  function setQuery(value: string) {
    if (value === "latest") {
      setSortBy("date");
      setSort("desc");
      getSortedBy(
        merchant.user_name,
        "date",
        "desc",
        cat as string,
        pageManagement.page,
      );
    }
    if (value === "expensive") {
      setSortBy("price");
      setSort("desc");
      getSortedBy(
        merchant.user_name,
        "price",
        "desc",
        cat as string,
        pageManagement.page,
      );
    }
    if (value === "cheapest") {
      setSortBy("price");
      setSort("asc");
      getSortedBy(
        merchant.user_name,
        "price",
        "asc",
        cat as string,
        pageManagement.page,
      );
    }
  }

  function setFilterCat(value: string) {
    setCat(value);
    getSortedBy(merchant.user_name, sort_by, sort, value, pageManagement.page);
  }

  if (!productsData || !merchantData || !pageInformation) {
    return (
      <>
        <Head>
          <title>{`${merchant.name} | Platypus`}</title>
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
        <title>{`${merchant.name} | Platypus`}</title>
        <meta name="platypus" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-w-screen flex flex-col items-center pt-5">
        <div className="flex w-full px-2 py-3 lg:px-5">
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
                <SelectItem value="expensive">Most expensive</SelectItem>
                <SelectItem value="cheapest">Cheapest</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-full px-2 py-3 lg:px-5">
          <Select onValueChange={(e) => setFilterCat(e)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="h-36 overflow-y-scroll">
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                {categories.map((item: ICategoryMerchant) => {
                  return (
                    <SelectItem value={item.id} key={item.id}>
                      {item.category}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="mt-5 flex justify-center">
          <UniPagination
            onClickChangePage={onClickChangePage}
            onClickNextChangePage={onClickNextChangePage}
            onClickPrevChangePage={onClickPrevChangePage}
            pageInformation={pageInformation}
          />
        </div>
        <div className="xl:grid-cols-6-prod-card grid w-full min-w-[348px] grid-cols-2-prod-card justify-around gap-2 gap-y-3 px-2 md:grid-cols-4-prod-card md:gap-y-10 md:px-5 md:py-10">
          {productsData.length == 0 && (
            <p className="md:px-1">No products to show.</p>
          )}
          {productsData.map((item: IProduct) => {
            return (
              <ProductCard
                id={item.id}
                key={item.id}
                url={item.photo}
                name={item.title}
                price={parseInt(item.min_price)}
                city={item.city}
                rating={ratingFormat(item.average_rating)}
                sold={item.total_sold}
              />
            );
          })}
        </div>
        <div className="mt-5 flex justify-center">
          <UniPagination
            onClickChangePage={onClickChangePage}
            onClickNextChangePage={onClickNextChangePage}
            onClickPrevChangePage={onClickPrevChangePage}
            pageInformation={pageInformation}
          />
        </div>
      </main>
    </>
  );
};

MerchantProducts.getLayout = function getLayout(page: ReactElement) {
  return <MerchantLayout>{page}</MerchantLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: any) => {
  if (!params || !params.name) {
    return {
      notFound: true,
    };
  }
  const responseMerchant = await fetch(
    `${process.env.BASE_API_URL}/merchants/${params.name}`,
  );
  const resultJSONMerchant = await responseMerchant.json();
  const merchant = resultJSONMerchant.data;

  if (!merchant) {
    return {
      notFound: true,
    };
  }

  const responseProducts = await fetch(
    `${process.env.BASE_API_URL}/merchants/${params.name}/products?exclude_not_active=true&exclude_no_stock=true`,
  );
  const resultJSONProducts = await responseProducts.json();
  const products = resultJSONProducts.data;
  const pagination_info = resultJSONProducts.meta.pagination_info;

  const response = await fetch(
    `${process.env.BASE_API_URL}/merchants/${params.name}/categories`,
  );
  const resultJSON = await response.json();
  const categories = resultJSON.data;

  return {
    props: {
      products,
      merchant,
      categories,
      pagination_info,
    },
  };
};

export default MerchantProducts;
