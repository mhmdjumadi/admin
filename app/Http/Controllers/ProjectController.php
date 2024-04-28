<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use App\Models\Project;
use Illuminate\Http\JsonResponse;

class ProjectController extends Controller
{
    public function index(): Response
    {
        $projects = Project::all();
        return Inertia::render('Project/Index', compact('projects'));
    }

    public function store(Request $request): RedirectResponse
    {
        $validate = $request->validate([
            'project_name' => 'required',
            'person' => 'required',
            'company' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
            'bill' => 'required',
        ]);

        try {
            Project::create($validate);
            return back()->with('success', 'Success create new project!');
        } catch (\Throwable $th) {
            return back()->with('warning', $th->getMessage());
        }
    }

    public function detail(string $id): jsonResponse
    {
        $project = Project::find($id);
        return response()->json($project);
    }

    public function delete($id): RedirectResponse
    {
        try {
            $project = Project::findOrFail($id);
            $project->delete();
            return back()->with('success', 'Project deleted successfully');
        } catch (\Throwable $th) {
            return back()->with('warning', $th->getMessage());
        }
    }
}
