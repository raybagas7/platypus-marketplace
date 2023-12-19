import React, { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import UserSettingsLayout from "@/components/Layout/UserSettingsLayout";
import Modal from "@/components/Modal/Modal";
import ProfilePictureContainer from "@/components/UserBiodata/ProfilePictureContainer";
import { useUser } from "@/store/user/useUser";
import { formatDate } from "@/utils/formatDate";
import { RiEdit2Line, RiLockPasswordLine } from "react-icons/ri";
import IconButton from "@/components/IconButton/IconButton";
import UserBioSkeleton from "@/components/Skeleton/UserBioSkeleton";
import { useModal } from "@/store/modal/useModal";
import EditEmailForm from "@/components/Form/UserEdit/EditEmailForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Head from "next/head";

const User: NextPageWithLayout = () => {
  const { showModal } = useModal.getState();
  const userData = useUser.use.userData();

  const handlerEditEmail = () => {
    showModal(<EditEmailForm />);
  };

  return (
    <main className="p-5 pt-0">
      <Head>
        <title>User Settings | Platypus</title>
        <meta name="platypus" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Modal backDropClose />
      <div className=" space-y-5 lg:flex lg:gap-10 lg:space-y-0">
        <div className="flex w-full flex-col items-center justify-center lg:h-fit lg:w-fit lg:justify-start">
          <ProfilePictureContainer />
          <div className="mt-5 w-[15rem] rounded-lg border-[1px] border-border p-5 shadow-md">
            <Link href={"/change-password"}>
              <Button className="w-full space-x-2">
                <RiLockPasswordLine /> <p>Change Password</p>
              </Button>
            </Link>
          </div>
        </div>
        <div>
          {userData ? (
            <>
              <div>
                <div className="flex items-center gap-3 py-5 lg:pt-0">
                  <h1 className="text-lg font-bold text-primary md:text-xl">
                    Your Personal Biodata
                  </h1>
                  <IconButton
                    name="edit-bio"
                    component={<RiEdit2Line className="h-5 w-5" />}
                  />
                </div>
                <div className="flex space-x-5">
                  <div className="w-32 space-y-5">
                    <p className="line-clamp-1">First Name</p>
                    <p className="line-clamp-1">Last Name</p>
                    <p className="line-clamp-1">Gender</p>
                    <p className="line-clamp-1">Date of Birth</p>
                  </div>
                  <div className="space-y-5">
                    <div className="flex gap-3">
                      <p className="line-clamp-1">{userData?.first_name}</p>
                    </div>
                    <div className="flex gap-3">
                      <p className="line-clamp-1">{userData?.last_name}</p>
                    </div>
                    <div className="flex gap-3">
                      <p className="line-clamp-1">{userData?.gender}</p>
                    </div>
                    <div className="flex gap-3">
                      <p className="line-clamp-1">
                        {userData.date_of_birth
                          ? formatDate(userData.date_of_birth)
                          : undefined}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 py-5 ">
                  <h1 className="text-lg font-bold text-primary md:text-xl">
                    Your Contact
                  </h1>
                  <IconButton
                    name="edit-bio"
                    component={<RiEdit2Line className="h-5 w-5" />}
                  />
                </div>
                <div className="flex space-x-5">
                  <div className="w-32 space-y-5">
                    <p className="line-clamp-1">Username</p>
                    <p className="line-clamp-1">Email</p>
                    <p className="line-clamp-1">Phone</p>
                  </div>
                  <div className="space-y-5">
                    <p className="line-clamp-1">{userData?.username}</p>
                    <div className="flex gap-3">
                      <p className="line-clamp-1">{userData?.email}</p>
                      <button
                        onClick={handlerEditEmail}
                        className="text-primary transition hover:underline hover:transition"
                      >
                        edit
                      </button>
                    </div>
                    <div className="flex gap-3">
                      <p className="line-clamp-1">{userData?.phone_number}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-10 lg:w-[24rem]">
              <UserBioSkeleton />
              <UserBioSkeleton />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

User.getLayout = function getLayout(page: ReactElement) {
  return <UserSettingsLayout>{page}</UserSettingsLayout>;
};

export default User;
