import React from "react";
import ProfileImageWithDefault from "../components/ProfileImageWithDefault";

const ProfilePage = (props) => {
  return (
    <div>
      <div className="row">
        <div className="pt-2">
          <div className="d-flex">
            <ProfileImageWithDefault
              alt="profile"
              width="200"
              height="200"
              src={props.loadedImage}
              className="rounded-circle shadow"
            />
            <div className="ms-2 flex-fill align-self-center">
              <span className="fs-3 fw-bolder">Username - 21 </span>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-8">User description</div>
        <div className="col-4">
          <div class="card">
            <div className="d-flex"></div>
            <div class="card-body">
              <div className="d-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="align-self-center bi bi-house-door"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z" />
                </svg>
                <span className="ps-1">
                  Woman | Straight | Monogamous (Single){" "}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
