import { updateSetting } from "../../services/apiSettings";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpateSettings } from "./useUpdateSetting";

function UpdateSettingsForm() {
    const { isPending, settings: { minBookingLength, maxBookingLength, maxNumberOfGuestsPerBooking, breakfastPrice } = {} } = useSettings();

    const { isUpdating, updateSetting } = useUpateSettings();

    function handleUpdate(e, field) {
        const { value } = e.target;
        if (!value) return;
        updateSetting({ [field]: value });
    }

    if (isPending) return <Spinner />;
    return (
        <Form>
            <FormRow label="Minimum nights/booking">
                <Input
                    type="number"
                    id="min-nights"
                    disabled={isUpdating}
                    defaultValue={minBookingLength}
                    onBlur={e => handleUpdate(e, "minBookingLength")}
                />
            </FormRow>

            <FormRow label="Maximum nights/booking">
                <Input
                    type="number"
                    id="max-nights"
                    disabled={isUpdating}
                    defaultValue={maxBookingLength}
                    onBlur={e => handleUpdate(e, "maxBookingLength")}
                />
            </FormRow>

            <FormRow label="Maximum guests/booking">
                <Input
                    type="number"
                    id="max-guests"
                    disabled={isUpdating}
                    defaultValue={maxNumberOfGuestsPerBooking}
                    onBlur={e => handleUpdate(e, "maxNumberOfGuestsPerBooking")}
                />
            </FormRow>

            <FormRow label="Breakfast price">
                <Input
                    type="number"
                    id="breakfast-price"
                    disabled={isUpdating}
                    defaultValue={breakfastPrice}
                    onBlur={e => handleUpdate(e, "breakfastPrice")}
                />
            </FormRow>
        </Form>
    );
}

export default UpdateSettingsForm;
