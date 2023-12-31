import { AddressForm } from "@/components/Form/AddressForm";
import UserSettingsLayout from "@/components/Layout/UserSettingsLayout";
import Modal from "@/components/Modal/Modal";
import PlatypusHead from "@/components/SVG/PlatypusHead";
import AddressList from "@/components/UserAddress/AddressList";
import { Button } from "@/components/ui/button";
import { NextPageWithLayout } from "@/pages/_app";
import { useModal } from "@/store/modal/useModal";
import { useUser } from "@/store/user/useUser";
import Head from "next/head";
import React, { ReactElement } from "react";

const Address: NextPageWithLayout = () => {
  const { showModal } = useModal.getState();
  const userAddresses = useUser.use.userAddresses();
  const defaultAddress = useUser.use.defaultAddress();

  if (!userAddresses) {
    return (
      <main className="flex h-full flex-col items-center justify-center gap-3 p-5">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </main>
    );
  }
  return (
    <>
      <Head>
        <title>User Addresses | Platypus</title>
        <meta name="platypus" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full">
        <Modal backDropClose />
        <div className="flex flex-col gap-3 p-5 pt-0">
          <Button
            onClick={() => {
              showModal(<AddressForm />);
            }}
            className="w-full md:w-fit"
          >
            Add New Address
          </Button>
          {userAddresses.length === 0 ? (
            <div className="flex w-full items-center justify-center">
              <div className="flex items-center gap-3">
                <PlatypusHead className="h-20 w-20" />
                <div>
                  <p className="text-2x font-bold text-primary">
                    {`You don't have any account address yet`}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="md:rounded-lg md:border-[1px] md:border-border md:p-5">
              <h1 className="pb-5 text-center text-lg font-bold text-primary md:text-xl">
                List Of Your Address
              </h1>
              <div className="grid gap-3 md:grid-cols-2">
                {defaultAddress &&
                  defaultAddress.map((address) => {
                    return (
                      <AddressList
                        isActive={
                          address.is_default || address.is_shop_location
                        }
                        key={address.id}
                        addressData={address}
                      />
                    );
                  })}
                {userAddresses.map((address) => {
                  if (!address.is_default && !address.is_shop_location)
                    return (
                      <AddressList
                        isActive={address.is_default}
                        key={address.id}
                        addressData={address}
                      />
                    );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

Address.getLayout = function getLayout(page: ReactElement) {
  return <UserSettingsLayout>{page}</UserSettingsLayout>;
};

export default Address;
