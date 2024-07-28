<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;
use Inertia\Inertia;


class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $invoices = Invoice::with('project')->get();

        return Inertia::render('Invoice/Index', [
            'invoices' => $invoices,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $timestamp = date('YmdHis');
        $randomNumber = rand(100, 999);

        $validate = $request->validate([
            'project_id' => 'required',
            'invoice_date' => 'required',
            'invoice_name' => 'required',
            'amount' => 'required|numeric',
        ]);

        $validate["invoice_no"] = "INV-{$timestamp}-{$randomNumber}";
        $validate["description"] = $request->description;


        try {
            Invoice::create($validate);
            return back()->with('success', 'Invoice created successfully!!');
        } catch (\Throwable $th) {
            return back()->with('warning', $th->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Invoice $invoice)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Invoice $invoice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Invoice $invoice)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invoice $invoice)
    {
        try {
            $invoice->delete();
            return back()->with('success', 'Invoice deleted successfully!!');
        } catch (\Throwable $th) {
            return back()->with('warning', $th->getMessage());
        }
    }
}
