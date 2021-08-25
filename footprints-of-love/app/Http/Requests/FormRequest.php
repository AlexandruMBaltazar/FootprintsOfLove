<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest as Request;

class FormRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get only the fields that are part of the "fillable" attribute.
     *
     * @return array
     */
    public function fillable()
    {
        $fillable = (new $this->model())->getFillable();

        return $this->only($fillable);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $method = sprintf('rules%s', ucfirst(strtolower($this->method())));

        return $this->$method();
    }
}
