import styled from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

const Label = styled.label`
    font-weight: 500;
`;

const Error = styled.span`
    font-size: 1.4rem;
    color: var(--color-red-700);
`;

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
    const { id: editId, ...editValues } = cabinToEdit;
    const isEditSession = Boolean(editId);

    const { register, handleSubmit, reset, getValues, formState } = useForm({
        // defaultValues: isEditSession ? editValues : {},
        defaultValues: isEditSession ? editValues : {},
    });
    const { errors } = formState;

    const { createCabin, isCreating } = useCreateCabin();
    const { editCabin, isEditing } = useEditCabin();

    const isWorking = isCreating || isEditing;

    function onSubmit(data) {
        const image = typeof data.image === "string" ? data.image : data.image[0];

        if (isEditSession) {
            editCabin(
                { newCabinData: { ...data, image }, id: editId },
                {
                    onSuccess: data => {
                        console.log(data);
                        reset();
                        onCloseModal?.();
                    },
                }
            );
        } else
            createCabin(
                { ...data, image: image },
                {
                    onSuccess: data => {
                        console.log(data);
                        reset();
                        onCloseModal?.();
                    },
                }
            );
    }

    function onError(err) {
        // console.log(err);
    }

    return (
        // whenever the validation is failed then the secound function will be called not the first
        <Form
            onSubmit={handleSubmit(onSubmit, onError)}
            type={onCloseModal ? "modal" : "regular"}
        >
            {/* Cabin name */}
            <FormRow
                label="Cabin name"
                error={errors?.name?.message}
            >
                <Input
                    type="text"
                    id="name"
                    disabled={isWorking}
                    {...register("name", { required: "This field is required" })}
                />
            </FormRow>
            {/* Maximum capacity */}
            <FormRow
                label="Maximum capacity"
                error={errors?.maxCapacity?.message}
            >
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isWorking}
                    {...register("maxCapacity", {
                        required: "This field is required",
                        min: {
                            value: 1,
                            message: 'Capacity should be at least "1"',
                        },
                    })}
                />
            </FormRow>
            {/* Regular price */}
            <FormRow
                label="Regular price"
                error={errors?.regularPrice?.message}
            >
                <Input
                    type="number"
                    id="regularPrice"
                    disabled={isWorking}
                    {...register("regularPrice", {
                        required: "This field is required",
                        min: {
                            value: 1,
                            message: 'Capacity should be at least "1"',
                        },
                    })}
                />
            </FormRow>
            {/* Discount */}
            <FormRow
                label="Discount"
                error={errors?.discount?.message}
            >
                <Input
                    type="number"
                    id="discount"
                    disabled={isWorking}
                    {...register("discount", {
                        required: "This field is required",
                        validate: value => Number(value) <= Number(getValues().regularPrice) || "Discount should be less than regular price",
                    })}
                />
            </FormRow>
            {/* Description for website */}
            <FormRow
                label="Description for website"
                error={errors?.description?.message}
            >
                <Textarea
                    type="number"
                    id="description"
                    disabled={isWorking}
                    defaultValue=""
                    {...register("description", {
                        required: "This field is required",
                    })}
                />
            </FormRow>
            {/* Cabin photo */}
            <FormRow>
                <Label htmlFor="image">Cabin photo</Label>
                <FileInput
                    id="image"
                    accept="image/*"
                    {...register("image", {
                        required: isEditSession ? false : "This field is required",
                        validate: isEditSession
                            ? false
                            : {
                                  isValidExtension: value => {
                                      if (!value) return true;
                                      const allowedExtensions = ["jpg", "jpeg", "png", "webp"];
                                      const fileExtension = value[0]?.name?.split(".").pop().toLowerCase();
                                      return allowedExtensions.includes(fileExtension);
                                  },
                              },
                    })}
                />
                {errors.image && errors.image.type === "isValidExtension" && <Error>Only JPG, JPEG, PNG, or WEBP files are allowed</Error>}
            </FormRow>
            {/* Buttons */}
            <FormRow>
                {/* type is an HTML attribute! */}
                <Button
                    variation="secondary"
                    type="reset"
                    onClick={() => onCloseModal?.()}
                >
                    Cancel
                </Button>
                <Button disabled={isWorking}>{isEditSession ? "Edit cabin" : "Create a new cabin"}</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
