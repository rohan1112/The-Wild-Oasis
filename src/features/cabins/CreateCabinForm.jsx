import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
  const queryClient = useQueryClient();

  const { isLoading: isAdding, mutate } = useMutation({
    mutationFn: (data) => addCabin(data),
    onSuccess: () => {
      toast.success("Cabin Added Successfully");

      queryClient.invalidateQueries("cabins");
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function onSubmit(data) {
    mutate(data);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "Name is Required.",
          })}
          disabled={isAdding}
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
          disabled={isAdding}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regular_price?.message}>
        <Input
          type="number"
          id="regular_price"
          {...register("regular_price", {
            required: "Price is Required.",
          })}
          disabled={isAdding}
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
          disabled={isAdding}
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
          disabled={isAdding}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image")}
          disabled={isAdding}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isAdding}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
