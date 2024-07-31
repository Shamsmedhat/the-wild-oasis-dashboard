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
import { createCabin } from "../../services/apiCabins";

const Label = styled.label`
    font-weight: 500;
`;

const Error = styled.span`
    font-size: 1.4rem;
    color: var(--color-red-700);
`;

function CreateCabinForm() {
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, getValues, formState } = useForm();
    const { errors } = formState;

    const { mutate, isLoading: isCreating } = useMutation({
        mutationFn: createCabin, //here we can basically tell React Query what to do ASA the creation was successful
        onSuccess: () => {
            toast.success("Cabin successfully created");

            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },

        //here we can basically tell React Query what to do ASA the creation was unsuccessful
        onError: err => toast.error(err.message),
    });

    function onSubmit(data) {
        mutate({ ...data, image: data.image[0] });
        reset();
    }

    function onError(err) {
        // console.log(err);
    }

    return (
        // whenever the validation is failed then the secound function will be called not the first
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow
                label="Cabin name"
                error={errors?.name?.message}
            >
                <Input
                    type="text"
                    id="name"
                    disabled={isCreating}
                    {...register("name", { required: "This field is required" })}
                />
            </FormRow>

            <FormRow
                label="Maximum capacity"
                error={errors?.maxCapacity?.message}
            >
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isCreating}
                    {...register("maxCapacity", {
                        required: "This field is required",
                        min: {
                            value: 1,
                            message: 'Capacity should be at least "1"',
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Regular price"
                error={errors?.regularPrice?.message}
            >
                <Input
                    type="number"
                    id="regularPrice"
                    disabled={isCreating}
                    {...register("regularPrice", {
                        required: "This field is required",
                        min: {
                            value: 1,
                            message: 'Capacity should be at least "1"',
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Discount"
                error={errors?.discount?.message}
            >
                <Input
                    type="number"
                    id="discount"
                    disabled={isCreating}
                    {...register("discount", {
                        required: "This field is required",
                        validate: value => Number(value) <= Number(getValues().regularPrice) || "Discount should be less than regular price",
                    })}
                />
            </FormRow>

            <FormRow
                label="Description for website"
                error={errors?.description?.message}
            >
                <Textarea
                    type="number"
                    id="description"
                    disabled={isCreating}
                    defaultValue=""
                    {...register("description", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow>
                <Label htmlFor="image">Cabin photo</Label>
                <FileInput
                    id="image"
                    accept="image/*"
                    {...register("image", {
                        required: "This field is required",
                        validate: {
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

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button
                    variation="secondary"
                    type="reset"
                >
                    Cancel
                </Button>
                <Button disabled={isCreating}>Add cabin</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
