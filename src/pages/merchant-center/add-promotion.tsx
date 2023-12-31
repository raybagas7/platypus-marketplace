import React, { ReactElement } from "react";
import UserSellerLayout from "@/components/Layout/UserSellerLayout";
import { AddPromotionForm } from "@/components/Form/AddPromotionForm";
import Head from "next/head";

const AddPromotion = () => {
  return (
    <>
      <Head>
        <title>Add Promotion | Platypus</title>
        <meta name="platypus" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-w-screen flex min-h-screen flex-col items-center px-3 lg:ml-[20vw] lg:px-32">
        <div className="w-[93%] md:w-full">
          <AddPromotionForm />
        </div>
      </main>
    </>
  );
};

AddPromotion.getLayout = function getLayout(page: ReactElement) {
  return <UserSellerLayout>{page}</UserSellerLayout>;
};

export default AddPromotion;
