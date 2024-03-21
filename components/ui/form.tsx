
import {createTsForm, createUniqueFieldSchema} from "@ts-react/form"
import { z } from "zod"
import TextField from "./text-field"
import NumberField from "./number-field"
import ImageUploadField from "./image-upload-field"
import CheckBoxField from "./check-box-field"
import SelectField from "./select-field"
import ColorField from "./color-field"
import e from "express"
import ItemSelectField from "./item-select-field"

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

export const itemTypeSelectSchema = createUniqueFieldSchema(
    z.string(),
    "itemTypeSelect" 
)

const optionSchema = z.object({
    label: z.string(),
    value: z.string(),
    disable: z.boolean().optional(),
  });


export const colorSelectSchema = createUniqueFieldSchema(
    z.array(optionSchema).min(1),
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
    z.array(optionSchema).optional(),
    "optional colorSelect" 
)

export const optionalItemTypeSelectSchema = createUniqueFieldSchema(
    z.string().optional(),
    "optional itemTypeSelect" 
)


const mapping = [
    [z.string(), TextField],
    [z.number(), NumberField],
    [z.boolean(), CheckBoxField],
    [itemTypeSelectSchema, ItemSelectField],
    [optionalItemTypeSelectSchema, SelectField],
    [colorSelectSchema, ColorField],
    [imageUploadSchema, ImageUploadField],
    [categorySchema, SelectField],
    [optionalImageUploadSchema, ImageUploadField],
    [optionalcategorySchema, SelectField],
    [optionalColorSelectSchema, ItemSelectField],
] as const 


const TSForm = createTsForm(mapping)

export default TSForm