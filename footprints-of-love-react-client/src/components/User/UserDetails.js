import React, { useEffect } from "react";
import { connect } from "react-redux";
import Details from "./UserDetails/Details";
import * as userDetailsActions from "../../actions/user/details/userDetailsActions";
import Spinner from "../Spinner";
import Modal from "../Modal/Modal";
import { detailTypes } from "./UserDetails/detailTypes";

const UserDetails = (props) => {
  useEffect(() => {
    props.actions.fetchUserDetails(props.user.id);
  }, [props.actions, props.user.id]);

  const {
    gender,
    relationship,
    height,
    body_type,
    ethnicity,
    politics,
    language,
    education,
    employment,
    religion,
    sign,
    smoke,
    drink,
    diet,
    child,
    pet,
  } = props.details;

  const basicsDetails = [
    gender && gender.value,
    relationship && relationship.value,
  ];
  const looksDetails = [height + " cm", body_type && body_type.value];
  const backgroundDetails = [
    ethnicity && ethnicity.value,
    politics && politics.value,
    language && language.value,
    education && education.value,
    employment && employment.value,
    religion && religion.value,
    sign && sign.value,
  ];
  const lifestyleDetails = [
    smoke && smoke.value,
    drink && drink.value,
    diet && diet.value,
  ];
  const familyDetails = [child && child.value, pet && pet.value];

  let pageContent;

  if (props.isLoading) {
    pageContent = <Spinner />;
  } else {
    pageContent = detailTypes.map((detailType) => {
      let detailsContent;

      switch (detailType.name) {
        case "Basics":
          detailsContent = (
            <Details
              key={detailType.name}
              type={detailType.name}
              details={basicsDetails}
              icon={
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className=""
                >
                  <title>Combined Shape</title>
                  <g id="Symbols" fill="none" fill-rule="evenodd">
                    <g id="Icon/Basics/24" fill="#1A1A1A" fill-rule="nonzero">
                      <path
                        d="M17.75 12.843a5.454 5.454 0 1 1-.001 10.907 5.454 5.454 0 0 1 0-10.907zm0 1.5a3.953 3.953 0 1 0-.001 7.907 3.953 3.953 0 0 0 0-7.907zM10.431 8.55a.75.75 0 0 1 .75.75v8.885a.75.75 0 0 1-.75.75H1.547a.75.75 0 0 1-.75-.75V9.3a.75.75 0 0 1 .75-.75h8.885zm-.75 1.5H2.297v7.385h7.385V10.05zM11.42.275l9.91 2.656a.75.75 0 0 1 .336 1.255l-7.254 7.254a.75.75 0 0 1-1.255-.337l-2.655-9.91a.75.75 0 0 1 .918-.918zm.867 1.785l1.983 7.4 5.417-5.417-7.4-1.983z"
                        id="Combined-Shape"
                      ></path>
                    </g>
                  </g>
                </svg>
              }
            />
          );
          break;

        case "Looks":
          detailsContent = (
            <Details
              key={detailType.name}
              type={detailType.name}
              details={looksDetails}
              icon={
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className=""
                >
                  <path
                    d="M12.03 7.104a3.552 3.552 0 1 1 3.552-3.543 3.543 3.543 0 0 1-3.552 3.543zm0-5.704a2.16 2.16 0 1 0 2.16 2.161 2.15 2.15 0 0 0-2.16-2.16z"
                    fill="#191919"
                  ></path>
                  <path
                    d="M14.376 24.01a2.059 2.059 0 0 1-1.984-1.743l-.334-2.57-.38 2.57a2.077 2.077 0 0 1-2.069 1.743 2.225 2.225 0 0 1-1.641-.705 2.207 2.207 0 0 1-.621-1.669l.62-6.946-.416.686a1.957 1.957 0 0 1-2.152.928 1.854 1.854 0 0 1-1.215-1.02 1.8 1.8 0 0 1 0-1.586l2.745-5.25a3.617 3.617 0 0 1 2.68-1.947l1.725-.25a4.48 4.48 0 0 1 1.317 0l1.734.25a3.617 3.617 0 0 1 2.7 1.948l2.726 5.212a1.855 1.855 0 0 1-1.178 2.606 1.957 1.957 0 0 1-2.152-.928l-.417-.686.621 6.918a2.27 2.27 0 0 1-2.262 2.402l-.047.037zm-2.365-9.162a.871.871 0 0 1 .872.77l.835 6.426a.668.668 0 0 0 .658.557.873.873 0 0 0 .64-.27.844.844 0 0 0 .232-.648l-.844-9.47a.788.788 0 0 1 1.465-.481l1.762 2.912a.566.566 0 0 0 .622.25.428.428 0 0 0 .278-.612L15.84 9.07a2.215 2.215 0 0 0-1.65-1.187l-1.725-.232a3.051 3.051 0 0 0-.928 0l-1.725.25A2.216 2.216 0 0 0 8.172 9.09L5.482 14.3a.427.427 0 0 0 .279.613.556.556 0 0 0 .621-.26l1.762-2.903a.788.788 0 0 1 1.465.482l-.853 9.497a.862.862 0 0 0 .533.822c.11.046.229.07.348.068a.668.668 0 0 0 .659-.566l.834-6.417a.927.927 0 0 1 .881-.788z"
                    fill="#191919"
                  ></path>
                </svg>
              }
            />
          );
          break;

        case "Background":
          detailsContent = (
            <Details
              key={detailType.name}
              type={detailType.name}
              details={backgroundDetails}
              icon={
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className=""
                >
                  <title>Combined Shape</title>
                  <g id="Symbols" fill="none" fill-rule="evenodd">
                    <g
                      id="Icon/Background/24"
                      fill="#1A1A1A"
                      fill-rule="nonzero"
                    >
                      <path
                        d="M12.155.016L12 .015C18.627.015 24 5.38 24 12c0 6.566-5.287 11.899-11.841 11.984a.769.769 0 0 1-.317-.001l.158.002C5.373 23.985 0 18.619 0 12 0 5.433 5.289.1 11.844.016a.764.764 0 0 1 .311 0zM6.773 12.748l-5.247.001c.344 4.855 3.996 8.797 8.718 9.592a17.025 17.025 0 0 1-3.47-9.593zm15.7.001h-5.246a17.025 17.025 0 0 1-3.47 9.591c4.721-.794 8.373-4.736 8.717-9.591zm-6.748 0h-7.45A15.543 15.543 0 0 0 12 22.13a15.54 15.54 0 0 0 3.725-9.383zm-5.481-11.09l-.191.034c-4.63.867-8.188 4.768-8.527 9.557h5.247a17.027 17.027 0 0 1 3.47-9.591zm1.756.21l-.253.303a15.537 15.537 0 0 0-3.472 9.078h7.45a15.535 15.535 0 0 0-3.472-9.078L12 1.869zm1.755-.21l.137.18a17.022 17.022 0 0 1 3.335 9.411h5.247c-.344-4.855-3.996-8.798-8.719-9.591z"
                        id="Combined-Shape"
                      ></path>
                    </g>
                  </g>
                </svg>
              }
            />
          );
          break;

        case "Lifestyle":
          detailsContent = (
            <Details
              key={detailType.name}
              type={detailType.name}
              details={lifestyleDetails}
              icon={
                <svg
                  width="17"
                  height="24"
                  viewBox="0 0 17 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className=""
                >
                  <title>Combined Shape Copy</title>
                  <g id="Symbols" fill="none" fill-rule="evenodd">
                    <g
                      id="Icon/Lifestyle/24"
                      transform="translate(-4)"
                      fill="#1A1A1A"
                      fill-rule="nonzero"
                    >
                      <path
                        d="M18.617.153c.305.232.383.65.196.973l-.053.078-.568.743h2.054a.75.75 0 0 1 .655 1.12l-.06.09-7.589 9.762V22.5h2.326c.416 0 .753.336.753.75 0 .385-.29.702-.665.745l-.088.005H9.422a.752.752 0 0 1-.753-.75c0-.385.29-.702.665-.745l.088-.005h2.324v-9.582L4.159 3.157a.75.75 0 0 1 .488-1.202l.107-.007L16.3 1.947 17.562.296a.755.755 0 0 1 1.055-.143zm.093 3.294h-1.664l-3.947 5.167a.755.755 0 0 1-1.055.143.748.748 0 0 1-.196-.973l.052-.078 3.253-4.259H6.289l6.21 7.99 6.211-7.99z"
                        id="Combined-Shape-Copy"
                      ></path>
                    </g>
                  </g>
                </svg>
              }
            />
          );
          break;

        case "Family":
          detailsContent = (
            <Details
              key={detailType.name}
              type={detailType.name}
              details={familyDetails}
              icon={
                <svg
                  width="24"
                  height="20"
                  viewBox="0 0 24 20"
                  xmlns="http://www.w3.org/2000/svg"
                  className=""
                >
                  <title>Combined Shape</title>
                  <g id="Symbols" fill="none" fill-rule="evenodd">
                    <g
                      id="Icon/Family/24"
                      transform="translate(0 -2)"
                      fill="#1A1A1A"
                      fill-rule="nonzero"
                    >
                      <path
                        d="M17.976 2c.229 0 .445.107.587.29l5.274 6.802a.77.77 0 0 1 .164.455L24 9.57v11.66c0 .389-.282.71-.648.761L23.25 22H.75a.757.757 0 0 1-.743-.664L0 21.23V9.571l.001-.041a.79.79 0 0 1 .004-.044L0 9.571c0-.18.06-.344.16-.475l.003-.003 5.268-6.795a.737.737 0 0 1 .35-.258c.003 0 .007 0 .01-.002A.699.699 0 0 1 6.024 2l-.062.003A.736.736 0 0 1 6.014 2h.01zM6.024 4.005L1.5 9.84v10.62h2.063v-6.921c0-.39.282-.712.648-.763l.102-.007h3.375a.76.76 0 0 1 .75.77v6.921h2.111V9.838L6.024 4.005zM22.5 10.34H12.049v10.12H22.5V10.34zM6.938 14.308H5.063v6.152h1.875v-6.152zM20.3 12.769a.76.76 0 0 1 .75.77V17a.76.76 0 0 1-.75.77h-6a.76.76 0 0 1-.75-.77V13.54a.76.76 0 0 1 .75-.77zm-3.776 1.538H15.05v1.924l1.474-.001v-1.923zm3.026 0h-1.526v1.923h1.526v-1.922zm-1.937-10.77H7.578l4.083 5.264h10.033l-4.081-5.263z"
                        id="Combined-Shape"
                      ></path>
                    </g>
                  </g>
                </svg>
              }
            />
          );
          break;

        default:
          break;
      }

      return detailsContent;
    });
  }

  return (
    <div className="col-4">
      {pageContent}
      <Modal />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
    details: state.userDetails.details,
    isLoading: state.userDetails.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      fetchUserDetails: (userId) =>
        dispatch(userDetailsActions.fetchUserDetails(userId)),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
