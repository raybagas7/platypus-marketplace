import React, { ReactElement } from "react";
import UserSellerLayout from "@/components/Layout/UserSellerLayout";
import { ManageShipmentForm } from "@/components/Form/ManageShipmentForm";
import Head from "next/head";

const ManageCourier = () => {
  return (
    <>
      <Head>
        <title>Seller Manage Courier | Platypus</title>
        <meta name="platypus" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-w-screen flex min-h-screen flex-col items-center md:px-32 lg:ml-[20vw]">
        <div className="w-[93%] md:w-full">
          <div id="new-promotion-form" className="mb-20 mt-5 max-lg:mt-40">
            <h2 className="mb-5 text-xl font-bold text-primary md:text-4xl">
              Manage Courier
            </h2>
            <ManageShipmentForm />
          </div>
        </div>
      </main>
    </>
  );
};

ManageCourier.getLayout = function getLayout(page: ReactElement) {
  return <UserSellerLayout>{page}</UserSellerLayout>;
};

export default ManageCourier;
