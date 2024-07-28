<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    use HasFactory, HasUuids;
    protected $fillable = [
        'project_name',
        'person',
        'company',
        'email',
        'phone',
        'price',
        'billing_amount',
        'billing_month'
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    public function invoices(): HasMany
    {
        return $this->hasMany(Invoice::class);
    }
}
