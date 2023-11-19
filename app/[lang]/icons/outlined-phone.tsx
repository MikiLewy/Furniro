interface Props {
  className?: string;
}

const OutlinedPhone = ({ className }: Props) => {
  return (
    <svg fill="none" height="100%" width="100%" viewBox="0 0 22 22" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.73097 10.8813L8.30043 11.1356L8.73097 10.8813ZM9.64041 7.56299L9.88619 7.99841L9.88619 7.99841L9.64041 7.56299ZM13.3674 13.8742L13.1216 13.4388L13.1216 13.4388L13.3674 13.8742ZM9.97329 12.985L10.4038 12.7308L9.97329 12.985ZM14.9402 14.1084L14.5096 14.3626L14.9402 14.1084ZM13.5826 13.7527L13.8283 14.1881L13.8283 14.1881L13.5826 13.7527ZM17.3095 20.0639L17.5553 20.4993H17.5553L17.3095 20.0639ZM17.6733 18.7366L18.1038 18.4823L17.6733 18.7366ZM8.60913 17.9625L8.17859 18.2168L8.60913 17.9625ZM17.0943 20.1854L16.8486 19.7499H16.8486L17.0943 20.1854ZM5.91345 1.2518L5.66767 0.816378L5.66767 0.816378L5.91345 1.2518ZM3.63984 9.5476L4.07038 9.29335L3.63984 9.5476ZM7.48626 1.486L7.91679 1.23175V1.23175L7.48626 1.486ZM6.12862 1.13034L6.3744 1.56576V1.56576L6.12862 1.13034ZM10.2194 6.1142L9.78883 6.36845L10.2194 6.1142ZM9.85559 7.44153L9.60981 7.00611L9.85559 7.44153ZM9.95224 2.79386L9.99861 3.2917L9.95224 2.79386ZM20.691 11.7029L20.1932 11.7493L20.691 11.7029ZM8.43757 2.53876C8.16904 2.60315 8.00355 2.87303 8.06794 3.14156C8.13233 3.4101 8.40222 3.57558 8.67075 3.51119L8.43757 2.53876ZM1.04316 13.5326L0.545318 13.579L1.04316 13.5326ZM3.17428 7.27412C3.33194 7.04741 3.27596 6.73581 3.04925 6.57815C2.82254 6.42049 2.51094 6.47647 2.35328 6.70318L3.17428 7.27412ZM4.38376 20.7066C4.59922 20.8794 4.9139 20.8447 5.08663 20.6293C5.25935 20.4138 5.22471 20.0991 5.00926 19.9264L4.38376 20.7066ZM17.3705 19.3589C17.1719 19.5507 17.1665 19.8673 17.3583 20.0659C17.5502 20.2645 17.8667 20.27 18.0653 20.0781L17.3705 19.3589ZM10.6499 5.85996L7.91679 1.23175L7.05572 1.74024L9.78883 6.36845L10.6499 5.85996ZM5.88284 0.694919L5.66767 0.816378L6.15923 1.68722L6.3744 1.56576L5.88284 0.694919ZM3.20931 9.80184L8.17859 18.2168L9.03966 17.7083L4.07038 9.29335L3.20931 9.80184ZM17.3401 20.6208L17.5553 20.4993L17.0637 19.6285L16.8486 19.7499L17.3401 20.6208ZM18.1038 18.4823L15.3707 13.8541L14.5096 14.3626L17.2428 18.9908L18.1038 18.4823ZM13.3368 13.3173L13.1216 13.4388L13.6132 14.3096L13.8283 14.1881L13.3368 13.3173ZM10.4038 12.7308L9.1615 10.6271L8.30043 11.1356L9.54276 13.2393L10.4038 12.7308ZM9.88619 7.99841L10.1014 7.87695L9.60981 7.00611L9.39463 7.12757L9.88619 7.99841ZM9.1615 10.6271C8.62053 9.71098 8.93683 8.53429 9.88619 7.99841L9.39463 7.12757C7.96722 7.93328 7.46918 9.72792 8.30043 11.1356L9.1615 10.6271ZM13.1216 13.4388C12.1659 13.9782 10.9488 13.6537 10.4038 12.7308L9.54276 13.2393C10.37 14.6401 12.1921 15.1117 13.6132 14.3096L13.1216 13.4388ZM15.3707 13.8541C14.9552 13.1505 14.0448 12.9177 13.3368 13.3173L13.8283 14.1881C14.071 14.0511 14.3763 14.1368 14.5096 14.3626L15.3707 13.8541ZM17.5553 20.4993C18.2697 20.0961 18.5234 19.1929 18.1038 18.4823L17.2428 18.9908C17.3721 19.2098 17.3001 19.4951 17.0637 19.6285L17.5553 20.4993ZM8.17859 18.2168C10.035 21.3603 14.1365 22.4291 17.3401 20.6208L16.8486 19.7499C14.1102 21.2956 10.6138 20.374 9.03966 17.7083L8.17859 18.2168ZM5.66767 0.816378C2.45768 2.62829 1.34888 6.65142 3.20931 9.80184L4.07038 9.29335C2.50023 6.63448 3.42728 3.2293 6.15923 1.68722L5.66767 0.816378ZM7.91679 1.23175C7.50125 0.528076 6.59085 0.295279 5.88284 0.694919L6.3744 1.56576C6.61711 1.42876 6.92237 1.51443 7.05572 1.74024L7.91679 1.23175ZM9.78883 6.36845C9.91814 6.58741 9.84614 6.87271 9.60981 7.00611L10.1014 7.87695C10.8157 7.47371 11.0695 6.57048 10.6499 5.85996L9.78883 6.36845ZM9.99861 3.2917C15.1493 2.81205 19.7135 6.59864 20.1932 11.7493L21.1889 11.6566C20.658 5.95601 15.6064 1.76515 9.90588 2.29601L9.99861 3.2917ZM8.67075 3.51119C9.10121 3.40798 9.54446 3.33399 9.99861 3.2917L9.90588 2.29601C9.40428 2.34272 8.91409 2.4245 8.43757 2.53876L8.67075 3.51119ZM1.54101 13.4863C1.32782 11.1969 1.95692 9.02464 3.17428 7.27412L2.35328 6.70318C1.00628 8.64014 0.309443 11.0461 0.545318 13.579L1.54101 13.4863ZM5.00926 19.9264C3.09713 18.3935 1.78612 16.1183 1.54101 13.4863L0.545318 13.579C0.816579 16.4919 2.26892 19.0112 4.38376 20.7066L5.00926 19.9264ZM20.1932 11.7493C20.4676 14.6958 19.3464 17.4502 17.3705 19.3589L18.0653 20.0781C20.2501 17.9675 21.4926 14.9181 21.1889 11.6566L20.1932 11.7493Z"
        fill="#B64E3A"></path>
    </svg>
  );
};

export default OutlinedPhone;
