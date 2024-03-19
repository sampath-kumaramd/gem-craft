
import {createTsForm, createUniqueFieldSchema} from "@ts-react/form"
import { z } from "zod"
import TextField from "./text-field"
import NumberField from "./number-field"
import ImageUploadField from "./image-upload-field"
import CheckBoxField from "./check-box-field"
import SelectField from "./select-field"
import ColorField from "./color-field"
import e from "express"

export const descriptionSchema = createUniqueFieldSchema(
    z.string(),
    "description" 
)

export const imageUploadSchema = createUniqueFieldSchema(
    z.string(),
    "imageUpload"
)

export const categorySchema = createUniqueFieldSchema(
    z.string(),
    "category" 
)

export const colorSelectSchema = createUniqueFieldSchema(
    z.array(z.string()),
    "colorSelect" 
)

export const optionalDescriptionSchema = createUniqueFieldSchema(
    z.string().optional(),
    "optional description" 
)

export const optionalImageUploadSchema = createUniqueFieldSchema(
    z.string().url().optional(),
    "optional imageUpload" 
)

export const optionalcategorySchema = createUniqueFieldSchema(
    z.string().optional(),
    "optional category" 
)
export const optionalProjectSchema = createUniqueFieldSchema(
    z.string().optional(),
    "optional projectData" 
)
export const optionalColorSelectSchema = createUniqueFieldSchema(
    z.array(z.string()).optional(),
    "optional colorSelect" 
)






const mapping = [
    [z.string(), TextField],
    [z.number(), NumberField],
    [z.boolean(), CheckBoxField],
    [colorSelectSchema, ColorField],
    [imageUploadSchema, ImageUploadField],
    [categorySchema, SelectField],
    [optionalImageUploadSchema, ImageUploadField],
    [optionalcategorySchema, SelectField],
    [optionalColorSelectSchema, ColorField],
] as const 


const TSForm = createTsForm(mapping)

export default TSForm