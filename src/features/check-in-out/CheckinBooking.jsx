import styled from "styled-components";
import { useMoveBack } from "../../hooks/useMoveBack";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import BookingDataBox from "../../features/Bookings/BookingDataBox";
import { useBooking } from "../Bookings/useBooking";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { useCheckin } from "./useCheckin";
import useSettings from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";
import useCheckout from "./useCheckout";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isLoading } = useBooking();
  const { checkin, isCheckingIn } = useCheckin();
  const { checkout, isCheckingOut } = useCheckout();
  const { settingsData, isLoading: isLoadingSettings } = useSettings();
  const moveBack = useMoveBack();

  useEffect(
    function () {
      setConfirmPaid(booking?.is_paid ?? false);
    },
    [booking]
  );

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    status,
    guests,
    total_price,
    num_guests,
    has_breakfast,
    num_nights,
  } = booking;

  const { breakfast_price } = settingsData;

  const optionalBreakfastPrice = breakfast_price * num_guests * num_nights;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          extras_price: optionalBreakfastPrice,
          total_price: total_price + optionalBreakfastPrice,
          has_breakfast: true,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  function handleCheckout() {
    if (!confirmPaid) return;
    checkout(bookingId);
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!has_breakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast of {formatCurrency(optionalBreakfastPrice)}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((paid) => !paid)}
          id="confirm"
          disabled={confirmPaid || isCheckingIn}
        >
          I confirm that {guests.full_name} have paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(total_price)
            : `${formatCurrency(
                total_price + optionalBreakfastPrice
              )} (${formatCurrency(total_price)} +
                ${formatCurrency(optionalBreakfastPrice)})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        {status === "checked-in" && (
          <Button
            onClick={handleCheckout}
            disabled={!confirmPaid || isCheckingOut}
          >
            Check Out
          </Button>
        )}
        {status === "unconfirmed" && (
          <Button
            onClick={handleCheckin}
            disabled={!confirmPaid || isCheckingIn || isCheckingOut}
          >
            Check in booking #{bookingId}
          </Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
