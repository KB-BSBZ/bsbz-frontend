import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { styled } from "styled-components";
import { useEffect, useState } from "react";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}
const OptionBox = styled.div`
  background-color: ${(props) => props.theme.blurColor3};
  color: ${(props) => props.theme.textColor};
  display: flex;
  justify-content: space-between;
  padding: 3px 12px;
`;
const InfoBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: row;
  justify-content: space-between;
  background-color: ${(props) => props.theme.backgroundColor};

  box-shadow: 0px 4px 13px 0px rgb(0, 0, 0, 0.2);
`;
const ImgBox = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 50%;
    height: 50%;
  }
`;
const Name = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;

  font-size: 18px;
`;
const RoyalSum = styled.div`
  width: 20%;
  display: flex;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 24px;
  font-weight: bold;
`;

const DataBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.highlightColor};
  border-radius: 8px;
  overflow: hidden;

  box-shadow: 0px 4px 13px 0px rgb(0, 0, 0, 0.2);
`;

export interface LogData {
  product: LogProduct;
  sumRoyal: number;
  tradeDate: string;
  tradeRoyalCnt: number;
  tradelogId: number;
  userId: string;
}

export interface LogProduct {
  bonus: number;
  description: string | null;
  endDate: string;
  extra: string | null;
  imageUrl: string;
  leftRoyal: number;
  productCost: number;
  productId: number;
  productName: string;
  productType: string;
  profileUrl: string;
  registerDate: string;
  totalRoyal: number;
  views: number;
}

export default function MyAssetListBox({
  AssetLogDataArray,
}: {
  AssetLogDataArray: LogData[];
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const isLastPage = (page + 1) * rowsPerPage >= AssetLogDataArray.length;
  const emptyRows = isLastPage
    ? Math.ceil(AssetLogDataArray.length / 5) * 5 - AssetLogDataArray.length
    : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };

  return (
    <TableContainer
      component={Paper}
      style={{
        backgroundColor: "transparent",
        boxShadow: "0px 4px 13px 0px rgba(0, 0, 0, 0)",
        borderRadius: "3%",
        borderTop: "none",
        height: "85%",
        overflowY: "auto", // 추가된 부분 - 스크롤 적용
      }}
    >
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableBody>
          {(rowsPerPage > 0
            ? AssetLogDataArray.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : AssetLogDataArray
          ).map((AssetLogDataArray, index) => (
            <TableRow
              key={index}
              style={{ height: "100px", border: "none", width: "100%" }}
            >
              <TableCell component="th" scope="row" style={{ border: "none" }}>
                <DataBox>
                  <OptionBox>
                    <span>{AssetLogDataArray.product.productType} /</span>
                    <span> 마감</span>
                  </OptionBox>
                  <InfoBox>
                    <ImgBox>
                      {/* <img src={AssetLogDataArray.product.profileUrl}></img> */}
                      {AssetLogDataArray.product.productType === "esate" ? (
                        <img src={"../../images/estate-icon.png"} />
                      ) : AssetLogDataArray.product.productType === "luxury" ? (
                        <img src={"../../images/luxury-icon2.png"} />
                      ) : (
                        <img src={"../../images/music-icon.png"} />
                      )}
                    </ImgBox>
                    <Name>{AssetLogDataArray.product.productName}</Name>
                    <RoyalSum>{AssetLogDataArray.tradeRoyalCnt}</RoyalSum>
                  </InfoBox>
                </DataBox>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && isLastPage && (
            <TableRow
              style={{
                height: 100 * emptyRows,
                backgroundColor: "transparent",
                border: "none",
              }}
            >
              <TableCell colSpan={5} style={{ border: "none" }} />
            </TableRow>
          )}
        </TableBody>
        {AssetLogDataArray.length >= 5 && (
          <TableFooter
            style={{
              width: "100%",
              border: "none",
            }}
          >
            <TableRow style={{ border: "none", width: "100%" }}>
              <TablePagination
                rowsPerPageOptions={[5]}
                colSpan={3}
                count={AssetLogDataArray.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                labelDisplayedRows={({ from, to, count }) =>
                  `${from} ~ ${to} 총 ${count} 개`
                }
                labelRowsPerPage="다음 페이지"
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
                style={{
                  border: "none",
                }}
              />
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </TableContainer>
  );
}
