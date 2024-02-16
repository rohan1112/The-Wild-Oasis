import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import useSettings from "./useSettings";
import useUpdateSettings from "./useUpdateSettings";

function UpdateSettingsForm() {
  const { settingsData = {}, isLoading } = useSettings();
  const { updateSetting, isUpdating } = useUpdateSettings();
  const isWorking = isLoading || isUpdating;

  const { register, handleSubmit } = useForm();

  const {
    breakfast_price,
    max_booking_days,
    max_guests_per_booking,
    min_booking_days,
  } = settingsData;

  function onSubmit(data) {
    console.log(data);
    updateSetting(data);
  }

  if (isLoading) return <Spinner />;
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Minimum nights/booking">
          <Input
            type="number"
            id="min-nights"
            defaultValue={min_booking_days}
            {...register("min_booking_days", { required: true })}
            disabled={isWorking}
          />
        </FormRow>
        <FormRow label="Maximum nights/booking">
          <Input
            type="number"
            id="max-nights"
            defaultValue={max_booking_days}
            {...register("max_booking_days", { required: true })}
            disabled={isWorking}
          />
        </FormRow>
        <FormRow label="Maximum guests/booking">
          <Input
            type="number"
            id="max-guests"
            defaultValue={max_guests_per_booking}
            {...register("max_guests_per_booking", { required: true })}
            disabled={isWorking}
          />
        </FormRow>
        <FormRow label="Breakfast price">
          <Input
            type="number"
            id="breakfast-price"
            defaultValue={breakfast_price}
            {...register("breakfast_price", { required: true })}
            disabled={isWorking}
          />
        </FormRow>
        <Button>Edit Settings</Button>
      </Form>
    </>
  );
}

export default UpdateSettingsForm;
