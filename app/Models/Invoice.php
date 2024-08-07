<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Invoice extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'project_id',
        'invoice_date',
        'invoice_name',
        'invoice_no',
        'amount',
        'description',
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }
}
