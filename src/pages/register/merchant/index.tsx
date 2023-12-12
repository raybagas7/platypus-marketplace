import MerchantRegisterForm from "@/components/Form/MerchantRegisterForm";
import PlatypusHead from "@/components/SVG/PlatypusHead";
import { Button } from "@/components/ui/button";
import { useUser } from "@/store/user/useUser";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect } from "react";

function MerchantRegister() {
  const { getUserAddresses, getWalletData } = useUser.getState();
  const userAddressess = useUser.use.userAddresses();
  const walletData = useUser.use.walletData();

  useEffect(() => {
    getUserAddresses();
    getWalletData();
  }, []);

  if (!userAddressess) {
    return (
      <>
        <Head>
          <title>Merchant Register | Platypus</title>
          <meta name="platypus" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/vm4/favicon.ico" />
        </Head>
        <main className="flex h-screen w-screen flex-col items-center justify-center gap-10">
          <PlatypusHead className="h-12 lg:h-48" />
          <Link
            href={"/login"}
            className="text-xl font-bold text-primary lg:text-4xl"
          >
            Login First
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Merchant Register | Platypus</title>
        <meta name="platypus" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/vm4/favicon.ico" />
      </Head>
      <main className=" min-w-screen flex min-h-screen items-center justify-center">
        {userAddressess.length < 1 || walletData === undefined ? (
          <div className="flex flex-col items-center justify-center space-y-5">
            <p className="px-3 text-center text-base font-bold text-primary lg:text-2xl">
              You need to have at least 1 Address Registered & Set Platypay PIN
            </p>
            <div className="flex gap-3">
              {userAddressess.length < 1 && (
                <Link href={"/user/address"}>
                  <Button type="button">Register Address</Button>
                </Link>
              )}
              {!walletData && (
                <Link href={"/user/Platypay"}>
                  <Button type="button">Set Up Wallet</Button>
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1 px-5 lg:flex-row lg:gap-10">
            <div className="flex items-center justify-center gap-1 lg:flex-col">
              <PlatypusHead className="h-12 lg:h-48" />
              <div>
                <h1 className="text-4xl font-bold text-primary lg:text-7xl">
                  Register
                </h1>
                <p className="text-primary lg:text-2xl">Merchant</p>
              </div>
            </div>
            <MerchantRegisterForm />
          </div>
        )}
      </main>
    </>
  );
}

export default MerchantRegister;
