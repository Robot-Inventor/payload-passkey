import { AUTH_ERROR_CODES } from "../constants";

const isStepUpRequired = (error: unknown): boolean =>
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    ([AUTH_ERROR_CODES.SESSION_NOT_FRESH, AUTH_ERROR_CODES.STEP_UP_REQUIRED] as string[]).includes(
        error.code as string
    );

export { isStepUpRequired };
