import React, { ReactElement, useEffect } from "react";
import MerchantLayout from "@/components/Layout/MerchantLayout";
import { GetServerSideProps } from "next";
import { useMerchant } from "@/store/merchant/useMerchant";
import { IMerchant } from "..";
import Link from "next/link";
import Head from "next/head";

export interface ICategory {
  id: number;
  category: string;
  total_products: number;
}

export interface ICategoriesProps {
  categories: ICategory[];
  merchant: IMerchant;
}

const Merchant = ({ categories, merchant }: ICategoriesProps) => {
  const { setMerchant } = useMerchant.getState();
  const merchantData = useMerchant.use.merchant();
  const { setCat } = useMerchant.getState();

  useEffect(() => {
    if (merchant) {
      setMerchant(merchant);
    }
  }, []);

  if (!merchantData) {
    return null;
  }
  return (
    <>
      <Head>
        <title>Categories | Platypus</title>
        <meta name="platypus" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-w-screen flex flex-col items-center pt-5">
        <p className="mt-3 w-full font-medium md:px-5">
          All Available Categories
        </p>
        <div className="mt-5 h-[450px]  w-full overflow-y-scroll px-2">
          <div className="border-b"></div>
          {categories.map((item: ICategory) => {
            return (
              <Link
                className="flex h-20 items-center border-b hover:bg-primary/20 hover:underline"
                key={item.id}
                href={`/merchant/${merchant.user_name}/products/${item.id
                  .toString()
                  .toLowerCase()}`}
                onClick={() => setCat(item.id.toString())}
              >
                <p className="px-3">{item.category}</p>
                <div className="mx-5 h-[40%] border-l opacity-90"></div>
                <p className="px-3">{item.total_products}</p>
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
};

Merchant.getLayout = function getLayout(page: ReactElement) {
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

  const response = await fetch(
    `${process.env.BASE_API_URL}/merchants/${params.name}/categories`,
  );
  const resultJSON = await response.json();
  const categories = resultJSON.data;

  return {
    props: {
      categories,
      merchant,
    },
  };
};

export default Merchant;
