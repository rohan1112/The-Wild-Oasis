import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

function CreateCabinForm({ cabinData = {}, onCloseModal }) {
  const { isAdding, addCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isWorking = isAdding || isEditing;

  const { id: editId, ...cabinValues } = cabinData;
  const isCabinEdit = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isCabinEdit ? cabinValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isCabinEdit)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset(), onCloseModal?.();
          },
        }
      );
    else
      addCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset(), onCloseModal?.();
          },
        }
      );
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "Name is Required.",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Max Capacity" error={errors?.max_capacity?.message}>
        <Input
          type="number"
          id="max_capacity"
          {...register("max_capacity", {
            required: "Number of people is Required.",
            min: {
              value: 1,
              message: "Minimum number of people should be 1.",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regular_price?.message}>
        <Input
          type="number"
          id="regular_price"
          {...register("regular_price", {
            required: "Price is Required.",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "Discount is Required.",
            validate: (value) =>
              value <= getValues().regular_price || "Invalid discount",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        label="Description for Cabin"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "Description is Required.",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isCabinEdit ? false : "This Field Is required",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isCabinEdit ? "Edit Cabin" : "Add Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
