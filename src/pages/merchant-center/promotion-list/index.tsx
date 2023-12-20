import MyPromoContainer from "@/components/Container/MyPromoContainer/MyPromoContainer";
import UserSellerLayout from "@/components/Layout/UserSellerLayout";
import UniPagination from "@/components/Pagination/UniPagination";
import { useMyPromo } from "@/store/myPromo/useMyPromo";
import { useUser } from "@/store/user/useUser";
import Head from "next/head";
import React, { ReactElement, useEffect, useState } from "react";

const PromotionList = () => {
  const userData = useUser.use.userData();
  const { pageInformation, getPromoList } = useMyPromo();
  const [tableManagement, setTableManagement] = useState<{
    page: number;
    status: string;
  }>({
    page: 1,
    status: "",
  });

  const onClickChangePage = (key: string, value: number) => {
    setTableManagement({
      ...tableManagement,
      [key]: value,
    });
  };

  const onClickNextChangePage = (key: string) => {
    setTableManagement({
      ...tableManagement,
      [key]: tableManagement.page + 1,
    });
  };

  const onClickPrevChangePage = (key: string) => {
    setTableManagement({
      ...tableManagement,
      [key]: tableManagement.page - 1,
    });
  };

  useEffect(() => {
    if (userData) {
      getPromoList(
        tableManagement.page,
        tableManagement.status,
        userData.username,
      );
    }
  }, [userData, tableManagement]);

  if (!pageInformation || !userData) {
    return (
      <>
        <Head>
          <title>Promotion List | Seller Platypus</title>
          <meta name="platypus" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="min-w-screen flex min-h-screen flex-col items-center justify-center px-3 lg:ml-[20vw] lg:px-32">
          <span className="loading loading-dots loading-lg text-primary"></span>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Promotion List | Seller Platypus</title>
        <meta name="platypus" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-w-screen flex min-h-screen flex-col px-3 lg:ml-[20vw] lg:px-32">
        <MyPromoContainer />
        <div className="mb-10 flex justify-center">
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

PromotionList.getLayout = function getLayout(page: ReactElement) {
  return <UserSellerLayout>{page}</UserSellerLayout>;
};

export default PromotionList;